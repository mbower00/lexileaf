<template>
  <!-- using code from: 
    - https://www.w3schools.com/vue/vue_v-if.php
    - https://vuejs.org/guide/essentials/list
  -->
  <div class="syllable-container">
    <div v-for="(syllable, i) in syllables" class="single-syllable">
      <span>{{ syllable }}</span>
      <div class="dot" v-if="i !== syllables.length - 1"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["syllables"]
}
</script>

<style scoped>
.syllable-container {
  justify-content: center;
  max-width: fit-content;
  margin: 0 auto;
  overflow-wrap: break-word;
}

.single-syllable {
  display: inline-flex;
  align-items: center;
}

span {
  color: var(--gray1);
}

.dot {
  background-color: var(--gray1);
  margin-right: 3px;
  margin-left: 3px;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 100%;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .syllable-container {
    margin: 0;
  }
}
</style>