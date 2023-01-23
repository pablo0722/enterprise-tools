<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderPartial",
  created() {
    const scripts = [
      "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
      "//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
      "https://code.jquery.com/jquery-1.7.1.min.js",
      "/js/common.js",
      "/js/jiraApi.js",
    ];
    scripts.forEach((script) => {
      let tag = document.createElement("script");
      tag.setAttribute("type", "text/javascript");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  },
});
</script>

<template>
  <p></p>
</template>
