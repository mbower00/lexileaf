<template>
  <!-- I used this as a reference for designing the trash look https://fonts.google.com/icons?icon.query=trash&icon.size=24&icon.color=%235f6368 -->

  <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->
  <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
  <span @click="toggleTrash"
    :class="{ isTrash: isTrash || staticTrash, shouldTransition: !staticTrash && !staticAdd, staticAdd: staticAdd }">
    <div class="d1"></div>
    <div class="d2"></div>
    <div class="d3"></div>
    <div class="d41"></div>
    <div class="d42"></div>
    <div class="d5"></div>
    <div class="d6"></div>
  </span>
</template>

<script>
export default {
  props: {
    staticTrash: {
      required: false,
      default: false
    },
    staticAdd: {
      required: false,
      default: false
    },
    startOnTrash: {
      required: false,
      default: false
    }
  },
  emits: ["trashToggled"],
  data() {
    return {
      isTrash: this.startOnTrash
    }
  },
  methods: {
    toggleTrash() {
      if (!this.staticTrash && !this.staticAdd) {
        // startOnTrash should only matter in the at first
        // this.startOnTrash = false
        this.isTrash = !this.isTrash
        this.$emit('trashToggled', this.isTrash)
      }
    }
  },
}
</script>

<style scoped>
/* using code from:
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate 
 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
 */

span {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.staticAdd {
  cursor: default;
}

.staticAdd div {
  background-color: var(--gray1);
}

div {
  position: absolute;
  background-color: var(--green3);
}

.shouldTransition div {
  transition: all .15s ease;
}

.isTrash div {
  background-color: var(--gray1);
}

.d1 {
  transform: translate(0, 0);
  height: 3px;
  width: 20px;
}

.d2 {
  transform: translate(0, 0);
  height: 3px;
  width: 20px;
}

.d3 {
  transform: translate(0, 0) rotate(0deg);
  height: 3px;
  width: 6px;
}

.d41 {
  transform: translate(0, 0) rotate(90deg);
  height: 3px;
  width: 10px;
}

.d42 {
  transform: translate(0, 0) rotate(90deg);
  height: 3px;
  width: 10px;
}

.d5 {
  transform: translate(0, 0) rotate(90deg);
  height: 3px;
  width: 20px;
}

.d6 {
  transform: translate(0, 0) rotate(90deg);
  height: 3px;
  width: 20px;
}

/*Bottle Line*/
.isTrash .d1 {
  transform: translate(0, 11px) scale(1, 1);
  border-radius: 0 0 5px 5px;
}

/*Main Lid Line*/
.isTrash .d2 {
  transform: translate(0, -9px) scale(1.25, 1);
  border-radius: 0 0 0 0;
}

/*Minor Lid Line*/
.isTrash .d3 {
  transform: translate(0, -11px);
}

/*Middle Vertical Lines*/
.isTrash .d41 {
  transform: translate(3px, 1px) rotate(90deg);
}

.isTrash .d42 {
  transform: translate(-3px, 1px) rotate(90deg);
}

/*Left Line*/
.isTrash .d5 {
  transform: translate(-8.5px, 0) rotate(90deg);
}

/*Right Line*/
.isTrash .d6 {
  transform: translate(8.5px, 0) rotate(90deg);
}
</style>