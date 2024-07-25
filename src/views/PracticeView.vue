<template>
  <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->
  <div>
    <FlashCardsSection v-if="section === 'flash-cards'" @exit="(back) => { switchToSection('saved-words', back) }" />
    <SavedWordsSection v-if="section === 'saved-words'" @exit="() => { switchToSection('flash-cards') }" />
  </div>
</template>

<script>
import SavedWordsSection from '../components/SavedWordsSection.vue';
import FlashCardsSection from '../components/FlashCardsSection.vue';


export default {
  components: {
    SavedWordsSection,
    FlashCardsSection
  },
  /*
  SECTIONS
    saved-words
    flash-cards
  */
  data() {
    return {
      section: "saved-words",
    }
  },
  methods: {
    switchToSection(sec, back = false) {
      if (back) {
        const backSection = this.section
        this.section = ''
        // using code from https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
        setTimeout(() => { this.switchToSection(backSection) }, 5)
      } else {
        this.section = sec
      }
    }
  }
}
</script>

<style scoped></style>