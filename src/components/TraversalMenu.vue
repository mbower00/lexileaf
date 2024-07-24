<template>
  <!-- using code from: 
    - https://www.w3schools.com/vue/vue_v-if.php 
    - https://vuejs.org/guide/essentials/event-handling.html
    - https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings
  -->
  <div v-if="wordData" class="tm-container">

    <div v-if="prevWord" @click="() => { if (!notFound) { prevSelected() } }"
      :class="{ back: true, option: true, notFound: notFound }">

      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:arrow_left:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368&icon.query=arrow -->
      <span class="material-symbols-outlined">
        arrow_left
      </span>

      <div class="option-text">
        {{ prevWord }}
      </div>
    </div>

    <div v-if="nextWord" @click="() => { if (!notFound) { nextSelected() } }"
      :class="{ forward: true, option: true, notFound: notFound }">

      <div class="option-text">
        {{ nextWord }}
      </div>

      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:arrow_right:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%235f6368&icon.query=arrow -->
      <span class="material-symbols-outlined">
        arrow_right
      </span>

    </div>

  </div>
</template>

<script>
import { getCurrentWordLocation, getWordHistory, setToCurrentWordLocation } from "../utils/utils.js"
export default {
  props: ["wordData"],
  emits: ["traverseSelected"],

  // using code from https://vuejs.org/guide/essentials/watchers
  watch: {
    wordData(wd) {
      this.wordDataWatch(wd)
    }
  },

  data() {
    return {
      prevWord: false,
      nextWord: false,
      notFound: false,
      location: 0
    }
  },

  methods: {
    prevSelected() {
      setToCurrentWordLocation(this.location + 1)
      this.$emit('traverseSelected', this.prevWord)
    },
    nextSelected() {
      setToCurrentWordLocation(this.location - 1)
      this.$emit('traverseSelected', this.nextWord)

    },
    wordDataWatch(wd) {
      if (typeof wd === 'string') { // Not Found
        setToCurrentWordLocation(0)
        // console.log('Not Found')
        this.prevWord = " "
        this.nextWord = " "
        this.location = 0
        this.notFound = true
      } else if (wd) {              // Found
        // console.log('Found')
        this.notFound = false
        const history = getWordHistory()
        this.location = getCurrentWordLocation()

        // check if word is not the result of traversing!
        if (!wd.lexileafTraversal) {

        }

        // set prevWord
        if (this.location === history.length - 1) { // if at end, no prevWord
          // console.log('at end, no prevWord')
          this.prevWord = false
        } else {
          this.prevWord = history[this.location + 1]
        }

        // set nextWord
        if (this.location === 0) { // if at beginning, no nextWord
          // console.log('at beginning, no nextWord')
          this.nextWord = false
        } else {
          this.nextWord = history[this.location - 1]
        }
      } else {                      // Waiting
        // console.log("Waiting")
        this.notFound = false
        this.location = 0
      }
    }
  },
  mounted() {
    this.wordDataWatch(this.wordData)
  },
}
</script>

<style scoped>
/*using code from: 
  - https://www.tutorialspoint.com/how-to-prevent-text-from-occupying-more-than-one-line-in-css
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container
  - https://www.w3schools.com/css/css3_mediaqueries.asp
  - https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
  - https://www.w3schools.com/css/css_pseudo_classes.asp
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
  */


.tm-container {
  width: calc(100% - 60px);
  display: flex;
}

.option {
  display: flex;
  align-items: center;
  color: var(--green4);
  cursor: pointer;
}

.option:hover .option-text {
  text-decoration: underline;
}

.option:active {
  color: var(--green5);
}

.option-text {
  max-width: 85px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}


.forward {
  margin-left: auto;
}

.notFound {
  cursor: default;
  color: var(--gray1);
}

.notFound:hover .option-text {
  text-decoration: none;
}

.option:active {
  color: var(--gray1);
}

@media (min-width: 426px) {
  .tm-container {
    width: 100%;
  }

  .option-text {
    max-width: 150px;
  }
}
</style>