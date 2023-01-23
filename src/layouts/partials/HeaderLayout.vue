<script lang="ts">
import tools from "@/js/tools";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      tools,
    };
  },
});
</script>

<template>
  <div class="jumbotron-header-spacer"></div>
  <div class="jumbotron-header">
    <router-link to="/">
      <p>Home</p>
    </router-link>
    <router-link
      :to="tool.link + tool.query"
      v-for="tool in tools"
      :key="tool.id"
    >
      <p>{{ tool.name }}</p>
    </router-link>
  </div>
</template>
