<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientView",
  mounted() {
    const scripts = [
      "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
      "//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
    ];
    scripts.forEach((script) => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  },
});
</script>

<template>
  <p>ferpecto - Client</p>
</template>
