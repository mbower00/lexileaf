<template>
  <div class="view-container">
    <div>
      <SearchBar @searchSubmit="submitSearch" />
    </div>
    <WordDefinitionFull class="word-def" :wordData="wordData" />
  </div>
</template>

<script>
import WordDefinitionFull from "../components/WordDefinitionFull.vue";
import SearchBar from "../components/SearchBar.vue"
import { getWord, getRandomWord } from "../utils/external-services.js"

export default {
  components: { SearchBar, WordDefinitionFull },
  data() {
    return {
      wordData: undefined
    }
  },
  methods: {

    submitSearch(searchText) {
      this.getDefinition(searchText)
    },

    async getDefinition(word = false) {
      this.wordData = undefined

      if (word === false) {
        this.wordData = await getRandomWord()
      } else {
        this.wordData = await getWord(word)
      }
    }

  },
  // using code from https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-hooks
  mounted() {
    this.getDefinition()
  },
}
</script>

<style scoped>
.view-container {
  margin: 0 auto;
  padding: 15px;
}

.word-def {
  margin-top: 15px;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .view-container {
    max-width: 600px;
  }
}
</style>