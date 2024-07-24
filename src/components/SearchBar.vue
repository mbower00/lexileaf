<!-- 
  using code from:
  - https://vuejs.org/guide/essentials/template-refs.html
  - https://vuejs.org/guide/essentials/event-handling.html
  - https://test-utils.vuejs.org/guide/essentials/forms
  - https://stackoverflow.com/questions/41992865/what-is-capture-mode-on-an-event-listener 
  - https://vuejs.org/guide/extras/render-function.html#event-modifiers 
  - https://vuejs.org/guide/essentials/event-handling.html#event-modifiers

  - https://stackoverflow.com/questions/16261504/make-div-element-receive-focus
  - https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Keyboard
 -->

<template>
  <div class="search-bar-container">

    <div class="search-bar-container-abs" tabindex="0" @mouseleave="() => { this.isSearchFocused = false }"
      @mousemove="() => { this.isSearchFocused = true }">

      <div class="bar-mag-container">
        <!-- using code from https://test-utils.vuejs.org/guide/essentials/forms -->
        <form class="search-input-form" @submit.prevent="() => { submitSearch() }">
          <input @focusin="() => { this.isInputFocused = true; this.isSearchFocused = true }"
            @focusout="() => { this.isInputFocused = false }" ref="searchInput" v-model="searchText"
            class="search-input" type="text">
        </form>
        <!-- using copied code from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:search:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368 -->
        <span @click="() => { submitSearch() }" class="search-button material-symbols-outlined">
          search
        </span>
      </div>

      <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
      <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
      <div v-if="isSearchFocused"
        :class="`${borderClass} history-menu-container ${isInputFocused ? 'isInputFocused' : ''}`">
        <HistoryMenu @historyLength="sizeBorder" @queryClicked="(word) => { submitSearch(word) }" />
      </div>

    </div>
  </div>
</template>

<script>
import HistoryMenu from "./HistoryMenu.vue"
import { setToSearchHistory } from "../utils/utils.js";

export default {
  components: {
    HistoryMenu
  },

  emits: ["searchSubmit"],

  methods: {
    submitSearch(search = this.searchText) {
      if (search) {
        setToSearchHistory(search)
        // this.updateMenu = true
        this.isSearchFocused = false
        this.$emit("searchSubmit", search)
        search = undefined
        this.searchText = ""
        // using code from https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur
        this.$refs.searchInput.blur()
      }
    },
    sizeBorder(hisoryLen) {
      if (hisoryLen < 3) {
        this.borderClass = `b${hisoryLen}`
      } else {
        this.borderClass = 'b3'
      }
    },
  },

  data() {
    return {
      borderClass: "b0",
      isSearchFocused: false,
      // using code from https://test-utils.vuejs.org/guide/essentials/forms
      searchText: "",
      isInputFocused: false
    }
  },

}
</script>

<style scoped>
.search-bar-container {
  width: 100%;
  /*
  display: flex;
  align-items: center;
  */
  position: relative;
  margin-bottom: 52px;
}

.search-bar-container-abs {
  width: 100%;
  position: absolute;
  z-index: 2;
  /*
  display: flex;
  align-items: center;
  */
}

.bar-mag-container {
  align-items: center;
  display: flex;
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
  cursor: pointer;
}

.history-menu-container {
  width: 100%;
  border-radius: 15px;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0);
  border: 1px var(--gray1) solid;
  box-sizing: border-box;
  margin-top: -1px;
}

.isInputFocused {
  margin-top: 1px
}

.b0 {
  display: none;
}

.b1 {
  height: fit-content;
}

.b2 {
  height: fit-content;
}

.b3 {
  height: 104px;
}
</style>