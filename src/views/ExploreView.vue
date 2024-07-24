<!-- 
  See note about stackoverflow in SynonymDisplay.vue
 -->
<!-- using code from https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-hooks -->

<template>
  <div class="view-container">
    <div class="search-container">
      <SearchBar @searchSubmit="submitSearch" />

      <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->
      <!-- using copied code from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:ifl:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368&icon.query=die -->
      <span @click="() => { getDefinition() }" class="random-button material-symbols-outlined">
        ifl
      </span>

    </div>
    <!-- <div>
      <StyledButton @click="() => { getQueryParams() }">
        Random Word
      </StyledButton>
    </div> -->
    <WordDefinitionFull @reloadViaLink="getDefinition" @makeTraversal="traverseToWord" class="word-def"
      :wordData="wordData" />
  </div>
</template>

<script>
import WordDefinitionFull from "../components/WordDefinitionFull.vue";
import SearchBar from "../components/SearchBar.vue"
import { getWord, getRandomWord } from "../utils/external-services.js"
import { getQueryParams } from "../utils/utils.js"
import StyledButton from "../components/StyledButton.vue";

export default {
  components: { SearchBar, WordDefinitionFull, StyledButton },
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

      if (!word) {
        this.wordData = await getRandomWord()
      } else {
        this.wordData = await getWord(word)
      }
    },

    async traverseToWord(word) {
      this.wordData = undefined
      this.wordData = await getWord(word, true)
    },

    querySearch() {
      let qParams = getQueryParams()
      this.getDefinition(qParams.search)
    }
  },
  mounted() {
    this.querySearch()
  },
}
</script>

<style scoped>
.view-container {
  margin: 0 auto;
  padding: 15px;
}

.search-container {
  display: flex;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
  align-items: center;
  z-index: 2;
}


.random-button {
  color: var(--gray1);
  cursor: pointer;

}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .view-container {
    max-width: 600px;
  }
}
</style>