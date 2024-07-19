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
  display: flex;
  gap: 3px;
  justify-content: center;
}

.single-syllable {
  display: flex;
  align-items: center;
  gap: 3px;
}

span {
  color: var(--gray1);
}

.dot {
  background-color: var(--gray1);
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 100%;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .syllable-container {
    justify-content: left;
  }
}
</style>