<!-- 
  using code from:
  - https://vuejs.org/guide/essentials/template-refs.html
 -->

<template>
  <div class="search-bar-container">
    <!-- using code from https://test-utils.vuejs.org/guide/essentials/forms -->
    <form class="search-input-form" @submit.prevent="submitSearch">
      <input ref="searchInput" v-model="searchText" class="search-input" type="text">
    </form>
    <!-- from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:search:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368 -->
    <span @click="submitSearch" class="search-button material-symbols-outlined">
      search
    </span>
  </div>
</template>

<script>
export default {
  emits: ["searchSubmit"],

  methods: {
    submitSearch() {
      if (this.searchText) {
        this.$emit("searchSubmit", this.searchText)
        this.searchText = undefined
        this.$refs.searchInput.value = ""
      }
    }
  },

}
</script>

<style scoped>
.search-bar-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  font-size: x-large;
  padding: 7px;
  border: 1px var(--gray1) solid;
  border-radius: 15px;
  color: var(--gray2);
  /* using code from from https://fonts.google.com/selection/embed */
  font-family: "Poppins", sans-serif;
}

.search-input-form {
  width: 100%;
}

.search-input:focus {
  /*
  using code from:
   - https://stackoverflow.com/questions/9287803/removing-the-blue-glow-from-an-html-text-input-when-selected
   - https://developer.mozilla.org/en-US/docs/Web/CSS/outline
  */
  outline: 1px solid var(--green3);
}

.search-button {
  right: 5px;
  color: var(--gray1);
  position: absolute;
}
</style>