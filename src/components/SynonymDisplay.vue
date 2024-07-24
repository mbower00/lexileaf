<template>
  <span class="synonym-dot-container">
    <!-- using code from https://vuejs.org/guide/essentials/event-handling.html -->
    <!-- Here, https://stackoverflow.com/questions/51717785/vue-routers-router-link-with-actual-refresh
      they said that having it reload the page is "...killing the very purpose of SPA." So, I am having it
      emit. See WordDefinitionFull and ExploreView for what it emits to.
    -->
    <TextLink @click="() => { emitLinkClicked(synonym) }" :route="`/?search=${synonym}`">
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
  emits: ["linkClicked"],
  components: {
    TextLink
  },
  methods: {
    emitLinkClicked(word) {
      this.$emit('linkClicked', word)
    }
  },
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