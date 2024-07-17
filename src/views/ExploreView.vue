<template>
  <div class="view-container">
    <div>

      hello
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue"

export default {
  components: { SearchBar }
}
</script>

<style scoped>
div {
  border: 1px solid black;
  margin: 0 auto;
  padding: 15px;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .view-container {
    max-width: 700px;
  }
}
</style>