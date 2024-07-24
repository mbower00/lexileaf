<template>
  <div class="word-definition-full">
    <!-- using code from: 
    - https://www.w3schools.com/vue/vue_v-if.php
    - https://vuejs.org/guide/essentials/list
    -->

    <div v-if="typeof wordData === 'string'" class="result-container not-found-container">
      <span class="add-word-button nf">
        <AddOrTrashWordButton @trashToggled="addOrTrash" :staticAdd="true" />
      </span>

      <h1>oh no!</h1>
      <p class="not-found-body-text">The search entry: "{{ wordData }}" was not found. Please try again by searching
        with a different entry.</p>
    </div>


    <div v-else-if="wordData" class="result-container word-definition-container">
      <!-- ADD OR TRASH BUTTON -->
      <span class="add-word-button">
        <AddOrTrashWordButton @trashToggled="addOrTrash" :startOnTrash="wordAlreadySaved" />
      </span>

      <!-- WORD NAME -->
      <h1>
        {{ wordData.word }}
      </h1>

      <!-- SYLLABLES -->
      <div v-if="wordData.syllables" class="spacer-small"></div>
      <SyllableDisplay v-if="wordData.syllables" :syllables="wordData.syllables.list" />

      <!-- PRONUNCIATION -->
      <div v-if="!wordData.syllables && wordData.pronunciation" class="spacer-small"></div>
      <div v-if="wordData.pronunciation" class="pronunciation">
        {{ wordData.pronunciation.all }}
      </div>

      <!-- DEFINTIONS -->
      <div v-if="wordData.results" class="spacer"></div>
      <div v-if="wordData.results" v-for="(result, i) in wordData.results">
        <WordResult :resultData="result" />
        <div v-if="i !== wordData.results.length - 1" class="spacer"></div>
      </div>

      <!-- SYNONYMS -->
      <div v-if="synonyms">
        <div class="spacer"></div>
        <h3>Synonyms</h3>
        <div>
          <span v-for="(synonym, i) in synonyms">
            <SynonymDisplay :synonym="synonym" :omitDot="i !== synonyms.length - 1" />
          </span>
        </div>
      </div>

      <!-- ANTONYMS -->
      <div v-if="antonyms">
        <div class="spacer"></div>
        <h3>Antonyms</h3>
        <div>
          <span v-for="(antonym, i) in antonyms">
            <SynonymDisplay :synonym="antonym" :omitDot="i !== antonyms.length - 1" />
          </span>
        </div>
      </div>

    </div>


    <SpinningThing class="spinning-thing" v-else />
  </div>
</template>

<script>
import SpinningThing from "./SpinningThing.vue"
import SyllableDisplay from "./SyllableDisplay.vue";
import WordResult from "./WordResult.vue";
import SynonymDisplay from "./SynonymDisplay.vue"
import AddOrTrashWordButton from "./AddOrTrashWordButton.vue"
import { setToSavedWords, deleteSavedWord, checkForSavedWord, setToWordHistory } from "../utils/utils.js"

export default {
  props: ["wordData"],
  components: {
    SpinningThing,
    SyllableDisplay,
    SynonymDisplay,
    WordResult,
    AddOrTrashWordButton
  },
  computed: {
    synonyms() {
      return this.getFromDataset(this.wordData, "results", "synonyms")
    },
    antonyms() {
      return this.getFromDataset(this.wordData, "results", "antonyms")
    }
  },
  // using code from https://vuejs.org/guide/essentials/watchers
  watch: {
    wordData(wd) {
      if (wd) {
        // check if word is result of traversing

        setToWordHistory(wd.word)

        if (checkForSavedWord(wd.word)) {
          this.wordAlreadySaved = true
        } else {
          this.wordAlreadySaved = false
        }
      }
    }
  },
  data() {
    return {
      wordAlreadySaved: false
    }
  },
  methods: {
    addOrTrash(isTrash) {
      if (!isTrash) {
        // trash it
        deleteSavedWord(this.wordData.word)
      } else {
        // add it
        if (this.wordData.word) {
          let wordDataToAdd = { word: this.wordData.word }

          if (this.wordData.results) {
            wordDataToAdd.results = []

            this.wordData.results.forEach((result) => {
              if (result.partOfSpeech || result.definition) {
                let resultToAdd = {}

                if (result.partOfSpeech) {
                  resultToAdd.partOfSpeech = result.partOfSpeech
                }

                if (result.definition) {
                  resultToAdd.definition = result.definition
                }

                wordDataToAdd.results.push(resultToAdd)
              }
            })

          }

          setToSavedWords(wordDataToAdd)
        }
      }
    },
    getFromDataset(dataset, parentKey, childKey) {
      let gets = null // gets will be the items gotten, if applicable

      if (dataset) { // IF there is a dataset
        if (dataset[parentKey]) { // IF there is parentKey (e.g. results)
          dataset[parentKey].forEach((parent) => { // LOOP through the parentKey

            if (parent[childKey]) { // IF there is childKey (e.g. results)
              parent[childKey].forEach((child) => { // LOOP through the childKey
                if (!gets?.includes(child)) { // IF gets does not have the current child
                  // ADD the current synonym
                  if (!gets) {
                    gets = []
                  }
                  gets.push(child)
                }
              })
            }

          })
        }
      }
      return gets // RETURN the list of items (gets) OR null
    }
  },
}
</script>

<style scoped>
.word-definition-full {
  position: relative;
}

.spinning-thing {
  margin: 0 auto;
}

.spacer {
  height: 15px;
}

.spacer-small {
  height: 3px
}

/*BOTH*/
h1 {
  position: relative;
  text-align: center;
  margin: 0;
  line-height: 1;
  /*using code from: 
    - https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
    - https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
      - I am not sure what the difference between anywhere and break-word means
  */
  /*hyphens: manual;*/
  overflow-wrap: break-word;
}

h3 {
  margin: 3px 0 3px 0;
  color: var(--green4);
}

p {
  margin: 0;
}

.result-container {
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  padding: 15px;
  margin-top: 59px;
}

.add-word-button {
  position: absolute;
  right: 15px;
  top: -43px;
  padding: 5px;
  border: var(--green4) 1px solid;
  border-radius: 15px 15px 0 0;
  z-index: 1;
}

.add-word-button.nf {
  border: var(--gray1) 1px solid;
}

/*WORD DEFINITION*/
.word-definition-container {
  border-color: var(--green4);
}

.word-definition-container h1 {
  color: var(--green4);
}

.pronunciation {
  text-align: center;
  color: var(--gray1);
  font-size: small;
  /*using code from: 
    - https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
    - https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
      - I am not sure what the difference between anywhere and break-word means
  */
  /*hyphens: manual;*/
  overflow-wrap: break-word;
}

/*NOT FOUND*/
.not-found-container {
  border-color: var(--gray1);
}

.not-found-body-text {
  margin-top: 10px;
}

.not-found-container h1,
p {
  color: var(--gray2);
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .result-container {
    margin-top: 0;
  }

  .add-word-button {
    right: 15px;
    top: 15px;
    border: none;
    padding: 0;
  }

  .add-word-button.nf {
    border: none;
  }

  .not-found-container h1,
  p {
    color: var(--gray2);
  }

  h1 {
    text-align: left;
  }

  .pronunciation {
    text-align: left;
  }
}
</style>