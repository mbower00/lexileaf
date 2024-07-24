<template>
  <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
  <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->

  <div class="menu-container" v-if="searchHistory.length > 0">
    <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
    <!-- using code from https://vuejs.org/guide/essentials/list -->
    <div v-for="word in searchHistory" :class="{ menuWord: true }" @click="() => { queryClicked(word) }">
      {{ word }}
    </div>
    <div class="clear-menu" @click.capture="() => { clearHistory() }">clear search history</div>

  </div>
</template>

<script>
import { getSearchHistory, clearSearchHistory } from "../utils/utils.js";
export default {
  emits: ["historyLength", "queryClicked"],
  data() {
    return {
      searchHistory: getSearchHistory(),
    }
  },
  methods: {
    clearHistory() {
      clearSearchHistory()
      this.$emit("historyLength", 0)
    },
    queryClicked(word) {
      this.$emit("queryClicked", word)
    },
    mountMenu() {
      let historyLen = getSearchHistory().length
      if (historyLen < 1) {
        historyLen = 0
      } else {
        historyLen += 1
      }
      this.$emit("historyLength", historyLen)
    }
  },
  mounted() {
    this.mountMenu()
  },
}
</script>

<style scoped>
.menu-container {
  background-color: var(--white);
  border-radius: 15px;
  height: min-content;
}

/*
using code from:
  - https://www.w3schools.com/css/css_pseudo_classes.asp
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
  - https://www.tutorialspoint.com/how-to-prevent-text-from-occupying-more-than-one-line-in-css
*/

.menuWord {
  color: var(--gray2);
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;
  overflow-x: hidden;
  white-space: nowrap;
}

.menuWord:hover {
  background-color: var(--green0);
}

.menuWord:active {
  background-color: var(--green1);
}

.clear-menu {
  color: var(--gray1);
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
}

.clear-menu:hover {
  text-decoration: underline;
}
</style>