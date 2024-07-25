<!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->

<template>
  <div class="sorting-menu-container">
    <SortingOption :isSelected="selectedOption === 'added'" :isDown="isDownOption"
      @click="() => { optionSelected('added') }">
      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:hourglass_top:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=time&icon.size=24&icon.color=%235f6368 -->
      <span class="material-symbols-outlined">
        hourglass_top
      </span>
    </SortingOption>
    <SortingOption :isSelected="selectedOption === 'az'" :isDown="isDownOption" @click="() => { optionSelected('az') }">
      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:sort_by_alpha:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=az&icon.size=24&icon.color=%235f6368 -->
      <span class="material-symbols-outlined">
        sort_by_alpha
      </span>
    </SortingOption>
    <SortingOption :isSelected="selectedOption === 'results'" :isDown="isDownOption"
      @click="() => { optionSelected('results') }">
      <!-- using code copied from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:note_stack:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=more&icon.size=24&icon.color=%235f6368 -->
      <span class="material-symbols-outlined">
        note_stack
      </span>
    </SortingOption>
  </div>
</template>

<script>
import SortingOption from './SortingOption.vue';

export default {
  components: {
    SortingOption
  },
  emits: ["optionChanged"],
  /*
    BY NAMES
      added
      az
      results
  */
  data() {
    return {
      selectedOption: "added",
      isDownOption: true
    }
  },
  methods: {
    optionSelected(option) {
      if (this.selectedOption === option) { // if already selected
        // change isDownOption
        this.isDownOption = !this.isDownOption
      } else {                              // else
        // down
        this.isDownOption = true
        // update selectedOption
        this.selectedOption = option
      }
      this.$emit("optionChanged", { opt: this.selectedOption, dwn: this.isDownOption })
    }
  }
}
</script>

<style scoped>
.sorting-menu-container {
  display: flex;
  gap: 13px;
  margin-bottom: 5px;
  width: fit-content;
}
</style>