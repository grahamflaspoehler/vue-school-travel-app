<template>
  <nav id="nav">
    <p class="logo">The Vue School Travel App</p>
    <ul class="nav-links">
      <li class="links">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li
        class="links"
        v-for="destination in destinations"
        :key="destination.name"
      >
        <router-link
          :to="{
            name: 'DestinationDetails',
            params: { slug: destination.slug }
          }"
        >
          {{ destination.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {
      // destinationId: this.$route.params.id,
      destinations: store.destinations
    };
  }
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid gray;
  z-index: 1;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: turquoise;
}

.nav-links {
  display: flex;
}

.links {
  padding-right: 20px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}

.logo {
  font-size: 20px;
  color: purple;
  font-weight: bold;
}
</style>
