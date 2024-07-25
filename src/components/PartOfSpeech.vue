<template>
  <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
  <div :class="{ partOfSpeech: true, noColor: noColor }">
    {{ partOfSpeech }}
  </div>
</template>

<script>
export default {
  props: {
    partOfSpeech: {
      required: true
    },
    noColor: {
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.partOfSpeech {
  /*using code from https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform*/
  text-transform: uppercase;
  width: fit-content;
  line-height: 1;
  color: var(--green2);
  font-size: small;
  font-weight: bold;
}

.noColor {
  color: var(--gray1);
}
</style>