<script>
export default {
  data: () => ({
    components: [
      { id: 0, text: "ScrumPoker", link: "Other" },
      { id: 1, text: "DailyMeeting", link: "Other" },
    ],
  }),
};
</script>

<template>
  <button
    v-for="item of components"
    :key="item.id"
    @click="$router.push({ name: item.link })"
  >
    {{ item.text }}
  </button>
</template>

<style>
button {
  display: block;
  margin-bottom: 1em;
}
</style>
