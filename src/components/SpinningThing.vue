<template>
  <div>
    <div class="spinner">
      <div class="leaf-container lc1">
        <div class="inner-leaf-container">
          <SpinningLeaf class="leaf l1" />
        </div>
      </div>
      <div class="leaf-container lc2">
        <div class="inner-leaf-container">
          <SpinningLeaf class="leaf l2" />
        </div>
      </div>
      <div class="leaf-container lc3">
        <div class="inner-leaf-container">
          <SpinningLeaf class="leaf l3" />
        </div>
      </div>
      <div class="leaf-container lc4">
        <div class="inner-leaf-container">
          <SpinningLeaf class="leaf l4" />
        </div>
      </div>
      <div class="leaf-container lc5">
        <div class="inner-leaf-container">
          <SpinningLeaf class="leaf l5" />
        </div>
      </div>
      <div class="leaf-container lc6">
        <div class="inner-leaf-container">
          <SpinningLeaf class="leaf l6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinningLeaf from './SpinningLeaf.vue';

export default {
  components: {
    SpinningLeaf
  }
}
</script>

<style scoped>
/* using code from: 
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate 
*/

.leaf-container {
  height: 100px;
  width: 20px;
  position: absolute;
}

.spinner {
  position: relative;
  animation: 2.5s linear 0s infinite forwards spin;
  height: 110px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.lc1 {
  transform: rotate(0deg);
}

.lc2 {
  transform: rotate(60deg);
}

.lc3 {
  transform: rotate(120deg);
}

.lc4 {
  transform: rotate(180deg);
}

.lc5 {
  transform: rotate(240deg);
}

.lc6 {
  transform: rotate(300deg);
}

.inner-leaf-container {
  animation: 1.5s linear 0s infinite alternate up-and-down;
}

@keyframes up-and-down {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(0, 80px);
  }
}
</style>