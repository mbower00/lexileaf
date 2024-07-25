<template>
  <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
  <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->

  <div class="flash-cards-section-container">

    <div class="close-button" @click="() => { exitSection() }">
      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:close:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=x&icon.size=24&icon.color=%235f6368 -->
      <span class="material-symbols-outlined">
        close
      </span>
    </div>

    <div v-if="inProgress" class="card-counter">
      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:stacks:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=layers&icon.size=24&icon.color=%235f6368 -->
      <span class="material-symbols-outlined">
        stacks
      </span>
      {{ savedWords.length + 1 }}
    </div>

    <div v-if="inProgress" class="flash-card-area">
      <FlashCard :wordData="onWord" @nextCardRequested="nextWord" />
    </div>

    <div v-if="!inProgress" class="end-game-box">
      <h2 class="cursive-font">Congradulations!</h2>
      <div class="end-game-text">You finished the exercise! Great work!</div>
      <div class="missed-section">
        <div class="missed-text">Missed:</div>
        <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
        <div :class="{ allCorrect: missedCount < 1, countOfMissed: true }">
          {{ missedCount }}
        </div>
      </div>
      <div class="button-section">
        <div @click="() => { exitSection(true) }" class="button">Try Again</div>
        <div @click="() => { exitSection() }" class="button close">Close</div>
      </div>
    </div>

  </div>
</template>

<script>
import FlashCard from './FlashCard.vue';
import { getSavedWords } from '../utils/utils.js'

export default {
  emits: ["exit"],
  components: {
    FlashCard
  },
  data() {
    return {
      savedWords: getSavedWords(),
      givenWords: [],
      onWord: {},
      inProgress: true,
      missedCount: 0
    }
  },
  methods: {
    exitSection(sendBack = false) {
      this.$emit("exit", sendBack)
    },
    nextWord(resuffle = false) {
      if (resuffle) {
        this.savedWords.push(this.onWord)
        this.missedCount += 1
      }

      if (this.savedWords.length > 0) {
        // using code from https://www.w3schools.com/jsref/jsref_random.asp
        const randNext = Math.floor(Math.random() * this.savedWords.length)
        // using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        const randWord = this.savedWords.splice(randNext, 1)[0]
        this.onWord = randWord
      }

      else {
        this.inProgress = false
      }
    },
  },
  mounted() {
    this.nextWord()
  }
}
</script>

<style scoped>
/* using code from https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container */

.flash-cards-section-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 15px 15px 0 15px;
}

.close-button {
  color: var(--gray1);
  width: fit-content;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
}

.card-counter {
  color: var(--gray1);
  width: fit-content;
  position: absolute;
  left: 15px;
  top: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: large;
}

.flash-card-area {
  max-width: 400px;
  margin: 39px auto 15px auto;
}

.end-game-box {
  margin: 39px auto 0 auto;
  max-width: 450px;
  padding: 15px;
  border: 1px solid var(--green3);
  border-radius: 15px;
}

.end-game-box h2 {
  margin: 0;
  color: var(--green4);
  text-align: center;
}

.end-game-text {
  margin-top: 15px;
  text-align: center;
}

.missed-section {
  font-weight: bold;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
}

.missed-text {
  justify-self: right;
}

.countOfMissed {
  color: var(--red);
}

.allCorrect {
  color: var(--green3);
}

.button-section {
  display: flex;
  gap: 10px;
  max-width: 250px;
  margin: 10px auto 0 auto;
}


/*
using code from:
  - https://www.w3schools.com/css/css_pseudo_classes.asp
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
*/

.button {
  border: var(--green5) 1px solid;
  border-radius: 15px;
  padding: 5px 10px;
  color: var(--green5);
  cursor: pointer;
}

.button:hover {
  color: var(--green4);
  border-color: var(--green4);
}

.button:active {
  color: var(--green5);
  border-color: var(--green5);
}

/* using code from https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container */
.close {
  margin-left: auto;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .card-counter {
    position: relative;
    left: 0;
    top: 0;
    margin: 15px auto 15px auto;
  }

  .flash-card-area {
    margin-top: 0;
  }
}
</style>