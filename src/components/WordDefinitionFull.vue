<template>
  <div>
    <!-- using code from: 
    - https://www.w3schools.com/vue/vue_v-if.php
    - https://vuejs.org/guide/essentials/list
    -->

    <div v-if="typeof wordData === 'string'" class="result-container not-found-container">
      <h1>oh no!</h1>
      <p>The search entry: "{{ wordData }}" was not found. Please try again by searching with a different entry.</p>
    </div>


    <div v-else-if="wordData" class="result-container word-definition-container">
      <h1>
        {{ wordData.word }}
      </h1>
      <SyllableDisplay v-if="wordData.syllables" :syllables="wordData.syllables.list" />
      <div v-if="wordData.pronunciation" class="pronunciation">
        {{ wordData.pronunciation.all }}
      </div>
      <div v-if="wordData.results" class="spacer"></div>
      <div v-if="wordData.results" v-for="(result, i) in wordData.results">
        <WordResult :resultData="result" />
        <div v-if="i !== wordData.results.length - 1" class="spacer"></div>
      </div>
    </div>


    <SpinningThing class="spinning-thing" v-else />
  </div>
</template>

<script>
import SpinningThing from "./SpinningThing.vue"
import SyllableDisplay from "./SyllableDisplay.vue";
import WordResult from "./WordResult.vue";

export default {
  props: ["wordData"],
  components: {
    SpinningThing,
    SyllableDisplay,
    WordResult
  },
  computed: {
    synonyms() {
      this.wordData
    }
  },
}
</script>

<style scoped>
.spinning-thing {
  margin: 0 auto;
}

.spacer {
  height: 15px;
}

/*BOTH*/
h1 {
  text-align: center;
  margin: 0;
}

p {
  margin: 0;
}

.result-container {
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  padding: 15px;
}

/*WORD DEFINITION*/
.word-definition-container {
  border-color: var(--green4);
}

.word-definition-container h1 {
  color: var(--green4);
}

.pronunciation {
  text-align: center;
  color: var(--gray1);
  font-size: small;
}

/*NOT FOUND*/
.not-found-container {
  border-color: var(--gray1);
}

.not-found-container h1,
p {
  color: var(--gray2);
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  h1 {
    text-align: left;
  }

  .pronunciation {
    text-align: left;
  }
}
</style>