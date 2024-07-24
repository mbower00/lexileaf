<template>
  <div class="part-of-speech">
    {{ partOfSpeech }}
  </div>
</template>

<script>
export default {
  props: ["partOfSpeech"]
}
</script>

<style scoped>
.part-of-speech {
  /*using code from https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform*/
  text-transform: uppercase;
  width: fit-content;
  line-height: 1;
  color: var(--green2);
  font-size: small;
  font-weight: bold;
}
</style>