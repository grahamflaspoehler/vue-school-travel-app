<template>
  <div>
    <h1>Welcome {{ user }}</h1>
    <div class="invoices">
      <router-link :to="{
        name: 'TheInvoices',
        
      }">
        Invoices
      </router-link>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {
      user: store.user
    };
  },

  methods: {
    logout() {
      store.user = null;
      this.$router.push("/login");
    }
  }
};
</script>
