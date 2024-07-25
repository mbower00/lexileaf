<template>
  <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
  <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->
  <!-- using code from https://vuejs.org/guide/essentials/list -->

  <div class="flash-card-container">
    <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
    <div @click="flipCard" :class="{ button: true, flipButton: true, isFlip: isFlip }">
      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:turn_left:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=turn&icon.size=24&icon.color=%235f6368 -->
      <span class="material-symbols-outlined">
        turn_left
      </span>

    </div>

    <!-- FRONT -->
    <div v-if="!isFlip" class="flash-card front">
      <h2>{{ wordData.word }}</h2>
    </div>

    <!-- BACK -->
    <div v-else class="flash-card back">

      <h2>{{ wordData.word }}</h2>

      <div class="results-area">
        <div v-if="wordData.results" v-for="(result, i) in wordData.results">
          <WordResult :resultData="result" :gray="true" />
          <div v-if="i !== wordData.results.length - 1" class="spacer"></div>
        </div>
      </div>

      <div @click="() => { requestNextCard(true) }" class="button isFlip incorrect">
        <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:close:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=x&icon.size=24&icon.color=%235f6368 -->
        <span class="material-symbols-outlined">
          close
        </span>
      </div>
      <div @click="() => { requestNextCard(false) }" class="button isFlip correct">
        <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:check:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=correct&icon.size=24&icon.color=%235f6368 -->
        <span class="material-symbols-outlined">
          check
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import WordResult from './WordResult.vue'

export default {
  props: ["wordData"],
  emits: ["nextCardRequested"],
  components: {
    WordResult
  },
  // using code from https://vuejs.org/guide/essentials/watchers
  watch: {
    wordData(wd) {
      this.isFlip = false
    }
  },
  data() {
    return {
      isFlip: false
    }
  },
  methods: {
    flipCard() {
      this.isFlip = !this.isFlip
    },
    requestNextCard(putBack) {
      this.isFlip = false
      this.$emit("nextCardRequested", putBack)
    }
  }
}
</script>

<style scoped>
/* using code from https://www.w3schools.com/cssref/css_selectors.php */

.flash-card-container {
  position: relative;
}

.button {
  position: absolute;
  color: var(--white);
  padding: 6px 6px 0px 6px;
  cursor: pointer;
}

.flipButton {
  background-color: var(--green4);
  right: 0;
  border-radius: 0 15px 0 15px;
}

.isFlip {
  background-color: var(--gray2);
}

.incorrect {
  left: 0;
  bottom: 0;
  border-radius: 0 15px 0 15px;
}

.correct {
  right: 0;
  bottom: 0;
  border-radius: 15px 0 15px 0;
}

.spacer {
  height: 15px;
}

.flash-card {
  padding: 15px 15px 45px 15px;
  border-width: 1px;
  border-radius: 15px;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  min-height: 437px;
}

.flash-card.front {
  border-color: var(--green4);
}

.flash-card.back {
  border-color: var(--gray2);
}

.flash-card h2 {
  margin: 24px 0 15px 0;
  color: var(--green4);
  text-align: center;
}

.flash-card.back h2 {
  color: var(--gray2);
}

.results-area {
  height: 300px;
  overflow-y: scroll;
}
</style>