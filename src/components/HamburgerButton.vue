<template>
  <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->
  <div @click="toggleHamburger" class="hamburger-container">
    <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
    <div :class="{ bar: true, topBar: true, isX: isX }"></div>
    <div :class="{ bar: true, middleBar: true, isX: isX }"></div>
    <div :class="{ bar: true, bottomBar: true, isX: isX }"></div>
  </div>
</template>

<script>
export default {
  emits: ["hamburgerToggled"],
  data() {
    return {
      isX: false
    }
  },
  methods: {
    toggleHamburger() {
      this.isX = !this.isX
      this.$emit("hamburgerToggled", this.isX)
    }
  },
}
</script>

<style scoped>
/* using code from:
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate 
 - https://www.w3schools.com/cssref/css_selectors.php
 */

.hamburger-container {
  position: relative;
  width: 30px;
  height: 20px;
  align-items: center;
  display: flex;
}

.bar {
  background-color: var(--white);
  width: 30px;
  height: 3px;
  position: absolute;
  transition: all ease-out .3s;
  transform: rotate(0deg);
}

.topBar {
  transform: translate(0, -10px);
}


.bottomBar {
  transform: translate(0, 10px);
}

.isX.topBar {
  transform: rotate(45deg) translate(0, 0);
}

.isX.middleBar {
  transform: rotate(-45deg);
}

.isX.bottomBar {
  transform: rotate(45deg) translate(0, 0);
}
</style>