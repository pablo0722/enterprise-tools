<script lang="ts">
import tools from "@/js/tools";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolView",
  props: {
    tool: { type: String, required: true },
  },
  data() {
    return {
      tools,
      id: -1,
    };
  },
  methods: {
    startup: function () {
      let toolNames: string[] = tools.map((x) => x.query);
      this.id = toolNames.indexOf(this.tool);
    },
  },
  created() {
    this.startup();
  },
  updated() {
    this.startup();
  },
  computed: {
    component() {
      return tools[this.id].cmp;
    },
  },
});
</script>

<template>
  <div>
    <template v-if="id > -1">
      <h1>{{ tools[id].name }}</h1>
      <div>
        <component :is="component" :component="component"></component>
      </div>
    </template>
    <template v-else> TOOL NO ENCONTRADO </template>
  </div>
</template>
