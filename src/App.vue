<template>
  <header class="header-header">
    <div class="header-title-container">
      <h1 class="header-title cursive-font">lexileaf</h1>
      <div class="header-hamburger-container">
        <HamburgerButton @hamburgerToggled="setIsNavOpen" />
      </div>
    </div>
    <!-- using code from https://vuejs.org/guide/essentials/class-and-style.html#class-and-style-bindings -->
    <nav :class="{ 'header-nav': true, collapseNav: !isNavOpen }">
      <router-link class="header-link" to="/">Explore</router-link>
      <router-link class="header-link" to="/practice">Practice</router-link>
    </nav>
  </header>
  <router-view />
</template>

<script>
import HamburgerButton from "./components/HamburgerButton.vue"

export default {
  components: {
    HamburgerButton
  },
  data() {
    return {
      isNavOpen: false
    }
  },
  methods: {
    setIsNavOpen(isX) {
      this.isNavOpen = isX
    }
  },
}
</script>

<style scoped>
.header-header {
  display: block;
  align-items: center;
  background-color: var(--green2);
  color: var(--white);
}

.header-nav {
  display: flex;
  gap: 10px;
  flex-direction: column;
  text-align: center;
  padding: 0 15px 15px 15px;
}

/* using code from https://www.w3schools.com/cssref/css_selectors.php */
.header-nav.collapseNav {
  display: none;
}

.header-hamburger-container {
  position: absolute;
  right: 15px;
  font-size: xx-large;
}

.header-title-container {
  display: flex;
  align-items: center;
  position: relative;
}

.header-title {
  margin: 0;
  padding: 15px;
}

.header-link {
  text-decoration: none;
  color: var(--white);
}

.router-link-active {
  text-decoration: underline;
}

/* using code from https://www.w3schools.com/css/css3_mediaqueries.asp */
@media (min-width: 426px) {
  .header-header {
    display: flex;
  }

  .header-nav.collapseNav {
    display: flex;
  }

  /* using code from https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container */
  .header-nav {
    flex-direction: row;
    margin-left: auto;
    padding: 15px;
  }

  .header-hamburger-container {
    display: none;
  }
}
</style>
