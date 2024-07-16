<template>
  <nav>
    <router-link to="/">Explore</router-link>
    <router-link to="/practice">Practice</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}

a {
  text-decoration: none;
  color: var(--text);
}

.router-link-active {
  text-decoration: underline;
}
</style>
