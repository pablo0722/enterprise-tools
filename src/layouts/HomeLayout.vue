<script lang="ts">
import Header from "./partials/HeaderLayout.vue";
import Footer from "./partials/FooterLayout.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeLayout",
  components: {
    Header,
    Footer,
  },
});
</script>

<template>
  <div class="jumbotron-all">
    <slot name="header"><Header></Header></slot>
    <div class="jumbotron-center text-center">
      <div class="container">
        <slot name="content"></slot>
      </div>
    </div>
    <slot name="footer"><Footer></Footer></slot>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
