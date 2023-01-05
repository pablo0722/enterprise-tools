<script lang="ts">
import Home from "@/layouts/HomeLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
  data() {
    return {};
  },
});
</script>

<template>
  <Home>
    <template v-slot:content>
      <router-view />
    </template>
  </Home>
</template>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css";
@import "@/css/flexboxgrid.css";
@import "@/css/main.css";
</style>
