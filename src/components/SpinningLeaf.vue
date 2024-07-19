<template>
  <div class="spinning-leaf-container">
    <div class="leaf-part head">
    </div>
    <div class="leaf-part stem"></div>
  </div>
</template>

<style scoped>
.spinning-leaf-container {
  height: 20px;
  width: 20px;
  display: flex;
  flex-direction: column;
  /* using code from https://developer.mozilla.org/en-US/docs/Web/CSS/animation */
  animation: 2s linear 0s infinite forwards spin;
}

.leaf-part {
  background-color: var(--green2);
}

.head {
  height: 15px;
  width: 9px;
  border-radius: 100% 100% 80% 80%;
  margin: 0 auto;
}

.stem {
  height: 4px;
  width: 3px;
  margin: 0 auto;
  border-radius: 0 0 100% 100%;
}
</style>