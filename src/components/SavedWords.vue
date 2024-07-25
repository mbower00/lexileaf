<!-- using code from https://vuejs.org/guide/essentials/list -->
<!-- using code from https://vuejs.org/api/built-in-special-attributes.html#key -->
<!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->
<!-- using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort -->
<!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
<!-- using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed -->


<template>
  <div class="saved-words-container" v-if="savedWords.length > 0">
    <!-- I am using PartOfSpeech for the header here -->
    <PartOfSpeech class="sort-header" partOfSpeech="sort" />
    <div class="sorting-menu-holder">
      <SortingMenu @optionChanged="sortSavedWords" />
    </div>
    <div class="saved-words">
      <!-- I am not sure if I need the key, and I do not know exactly what it does -->
      <div class="word-definition-trash-container" v-for="savedWordData in savedWords" :key="savedWordData.word">
        <AddOrTrashWordButton class="trash-button" @click="() => { deleteWord(savedWordData.word) }"
          :staticTrash="true" />
        <div class="word-definition-partial-container">
          <WordDefinitionPartial :useWordLink="true" :wordData="savedWordData" />
        </div>
      </div>
    </div>
  </div>
  <div class="empty" v-else>
    <h2 class="cursive-font">Oh no!</h2>
    <p>You have no saved words. Head on over to <TextLink route="/">Explore</TextLink> and click the "+" to add a word!
    </p>
  </div>
</template>

<script>
import WordDefinitionPartial from './WordDefinitionPartial.vue';
import { deleteSavedWord, getSavedWords } from '../utils/utils.js'
import AddOrTrashWordButton from './AddOrTrashWordButton.vue';
import SortingMenu from './SortingMenu.vue'
import PartOfSpeech from './PartOfSpeech.vue';
import TextLink from './TextLink.vue';

export default {
  components: {
    WordDefinitionPartial,
    AddOrTrashWordButton,
    SortingMenu,
    PartOfSpeech,
    TextLink
  },
  emits: ["thereAreNoSavedWords"],
  /*
    BY NAMES
      added
      az
      results
  */
  data() {
    return {
      savedWords: getSavedWords(),
      savedWordsAsIs: getSavedWords(),
      howToSort: { by: "added", down: true }
    }
  },
  // using code from https://vuejs.org/guide/essentials/watchers
  watch: {
    savedWords(sw) {
      if (sw.length < 1) {
        this.$emit("thereAreNoSavedWords")
      }
    },
    howToSort(hts) {
      console.log('sdfsd')
      const by = hts.by
      const down = hts.down
      if (by === "added") {         // IF ADDED

        if (down) {           // IF DOWN
          this.savedWords = [...this.savedWordsAsIs]
        } else {              // IF UP
          this.savedWords = this.savedWordsAsIs.toReversed()
        }

      }
      else if (by === "az") {       // IF AZ

        if (down) {           // IF DOWN
          this.savedWords.sort((wordDataOne, wordDataTwo) => {
            return wordDataOne.word > wordDataTwo.word ? 1 : -1
          })
        } else {              // IF UP
          this.savedWords.sort((wordDataOne, wordDataTwo) => {
            return wordDataOne.word > wordDataTwo.word ? -1 : 1
          })
        }

      }
      else if (by === "results") {  // IF RESULTS

        function getResultsLength(wordData) {
          if (wordData.results) {
            return wordData.results.length
          } else {
            return 0
          }
        }

        if (down) {           // IF DOWN
          this.savedWords.sort((wordDataOne, wordDataTwo) => { return getResultsLength(wordDataTwo) - getResultsLength(wordDataOne) })
        } else {              // IF UP
          this.savedWords.sort((wordDataOne, wordDataTwo) => { return getResultsLength(wordDataOne) - getResultsLength(wordDataTwo) })
        }

      }
    }
  },
  methods: {

    deleteWord(word) {
      this.savedWords = this.savedWords.filter((savedWord) => { // remove from saved words
        return savedWord.word !== word
      })
      this.savedWordsAsIs = this.savedWordsAsIs.filter((savedWord) => { // remove from saved words as is
        return savedWord.word !== word
      })
      deleteSavedWord(word)
    },

    sortSavedWords(sortInfo) {
      this.howToSort = { by: sortInfo.opt, down: sortInfo.dwn }
    }
  },
  mounted() {
    if (this.savedWords.length < 1) {
      this.$emit("thereAreNoSavedWords")
    }
  },
}
</script>

<style scoped>
.sorting-menu-holder {
  display: flex;
  justify-content: center;
}

.sort-header {
  margin: 0 auto 7px auto;
}

.saved-words {
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr;
  justify-items: center;
}

.word-definition-trash-container {
  position: relative;
  width: 100%;
  display: flex;
  max-width: 400px;
  justify-content: center;
  box-sizing: border-box;
}

.word-definition-partial-container {
  padding: 15px;
  border: var(--green4) 1px solid;
  border-radius: 15px;
  height: 230px;
  overflow-y: scroll;
  width: 100%;
  margin-top: 43px;
}

.trash-button {
  position: absolute;
  border: var(--green4) 1px solid;
  border-radius: 15px 15px 0 0;
  padding: 5px;
  right: 15px;
  z-index: 2;
}

.empty {
  text-align: center;
  color: var(--gray2);
}

.empty h2 {
  margin: 0;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 633px) {
  .saved-words {
    grid-template-columns: 1fr 1fr;
  }

  .sorting-menu-holder {
    justify-content: left;
  }

  .sort-header {
    margin: 0 0 7px 0;
  }
}
</style>