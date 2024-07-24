<template>
  <div>
    <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->

    <PartOfSpeech v-if="resultData.partOfSpeech" :partOfSpeech="resultData.partOfSpeech" />
    <div class="spacer" v-if="resultData.definition && resultData.partOfSpeech"></div>
    <div v-if="resultData.definition" class="definition">
      {{ resultData.definition }}
    </div>
  </div>
</template>

<script>
import PartOfSpeech from './PartOfSpeech.vue';

export default {
  components: {
    PartOfSpeech
  },
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
.spacer {
  height: 3px
}
</style>