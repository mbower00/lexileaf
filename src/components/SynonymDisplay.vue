<template>
  <span class="synonym-dot-container">
    <TextLink route="/">
      <span class="synonym">{{ synonym }}</span>
    </TextLink>
    <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
    <span v-if="omitDot" class="synonym-dot"></span>
  </span>
</template>

<script>
import TextLink from './TextLink.vue';

export default {
  props: ["synonym", "omitDot"],
  components: {
    TextLink
  }
}
</script>

<style scoped>
.synonym {
  line-height: 1.6;
}

.synonym-dot {
  width: 5px;
  height: 5px;
  background-color: var(--gray1);
  border-radius: 100%;
  margin: 0 5px 0 5px;
}

.synonym-dot-container {
  display: inline-flex;
  align-items: center;
}
</style>