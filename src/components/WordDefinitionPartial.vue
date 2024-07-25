<template>
  <!-- using code from https://vuejs.org/guide/essentials/list -->
  <!-- using code from https://www.w3schools.com/vue/vue_v-if.php -->

  <div>
    <div class="word-title-container">
      <TextLink v-if="useWordLink" :route="`/?search=${wordData.word}`">
        <h2>{{ wordData.word }}</h2>
      </TextLink>
      <h2 v-else class="unlinked">{{ wordData.word }}</h2>
    </div>
    <div v-if="wordData.results" class="spacer"></div>
    <div v-if="wordData.results" v-for="(result, i) in wordData.results">
      <WordResult :resultData="result" />
      <div v-if="i !== wordData.results.length - 1" class="spacer"></div>
    </div>
  </div>
</template>

<script>
import TextLink from '../components/TextLink.vue';
import WordResult from './WordResult.vue';

export default {
  props: {
    wordData: {
      required: true
    }, useWordLink: {
      required: false,
      default: false
    }
  },
  components: {
    TextLink,
    WordResult
  }
}
</script>

<style scoped>
h2 {
  line-height: 1;
  margin: 0;
  display: inline;
  text-align: center;
}

.unlinked {
  color: var(--green4);

}

.spacer {
  height: 15px;
}

.word-title-container {
  display: flex;
  justify-content: center;
}
</style>