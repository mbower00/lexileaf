<template>
  <div v-if="!noSavedWords" class="play-button" @click="() => { exitSection() }">
    <span class="play-text">
      PLAY
    </span>
    <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:stacks:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=layers&icon.size=24&icon.color=%235f6368 -->
    <span class="material-symbols-outlined">
      stacks
    </span>
  </div>
  <SavedWords @thereAreNoSavedWords="() => { this.noSavedWords = true }" class="saved-words-area" />
</template>

<script>
import SavedWords from './SavedWords.vue';

export default {
  emits: ["exit"],
  components: {
    SavedWords
  },
  data() {
    return {
      noSavedWords: false
    }
  },
  methods: {
    exitSection() {
      this.$emit("exit")
    }
  }
}
</script>

<style scoped>
/*
using code from:
  - https://www.w3schools.com/css/css_pseudo_classes.asp
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
*/

.play-button {
  margin: 15px auto 0px auto;
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  cursor: pointer;
  color: var(--green4);
  border: var(--green4) 1px solid;
  border-radius: 15px;
  padding: 5px 15px;
}

.play-button:hover {
  border: var(--green3) 1px solid;
  color: var(--green3);
}

.play-button:active {
  border: var(--green2) 1px solid;
  color: var(--green2);
}

.play-text {
  font-size: larger;
  font-weight: bold
}

.saved-words-area {
  margin: 0 auto 0 auto;
  padding: 15px;
  max-width: 700px;

}
</style>