<!-- I used this an a reference for the arrow design https://fonts.google.com/icons?icon.query=arrow&icon.size=24&icon.color=%235f6368 -->
<!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
<!-- using code from https://www.w3schools.com/vue/vue_v-if.php  -->

<template>
  <div :class="{ sortingOptionContainer: true, isSelected: isSelected, isUp: !isDown }">
    <slot />
    <div v-if="isSelected" class="arrow-container">
      <div class="a a-mid"></div>
      <div class="a a-left"></div>
      <div class="a a-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isSelected", "isDown"]
}
</script>

<style scoped>
/* using code from:
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate 
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
 */

.sortingOptionContainer {
  color: var(--gray1);
  display: flex;
  gap: 3px;
  width: 37px;
  cursor: pointer;
  align-items: center;
}

.isSelected {
  color: var(--green2);
}

.arrow-container {
  width: 10px;
  height: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
}

.a {
  background-color: var(--green2);
  position: absolute;
  transition: all ease .2s;
}

.a-mid {
  width: 2px;
  height: 8px;
  transform: translate(0, -2px);
}

.a-left {
  width: 2px;
  height: 7px;
  transform: translate(-1.9px, 0) rotate(-45deg);
}

.a-right {
  width: 2px;
  height: 7px;
  transform: translate(1.9px, 0) rotate(45deg);
}

.isUp .a-mid {
  transform: translate(0, 0);
}

.isUp .a-left {
  transform: translate(1.9px, -3px) rotate(-45deg);
}

.isUp .a-right {
  transform: translate(-1.9px, -3px) rotate(45deg);
}
</style>