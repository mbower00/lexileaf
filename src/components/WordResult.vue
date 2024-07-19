<template>
  <div>
    <div v-if="resultData.partOfSpeech" class="part-of-speech">
      {{ resultData.partOfSpeech }}
    </div>
    <div class="spacer" v-if="resultData.definition && resultData.partOfSpeech"></div>
    <div v-if="resultData.definition" class="definition">
      {{ resultData.definition }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resultData: {
      required: true,
    },
    // onlyPartAndDef: {
    //   required: false,
    //   default: false
    // }
  }
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

.spacer {
  height: 3px
}
</style>