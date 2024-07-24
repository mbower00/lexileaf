<template>
  <!-- Using code from auto generated code in App.vue -->
  <router-link class="text-link" :to="route">
    <slot>
    </slot>
  </router-link>
</template>

<script>
export default {
  props: ["route", "text"]
}
</script>

<style scoped>
/*
using code from:
  - https://www.w3schools.com/css/css_pseudo_classes.asp
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
*/

.text-link {
  text-decoration: none;
  font-weight: bold;
  color: var(--green3);
}

.text-link:visited {
  color: var(--green3);
}

.text-link:hover {
  color: var(--green4);
}

.text-link:active {
  color: var(--green5)
}
</style>