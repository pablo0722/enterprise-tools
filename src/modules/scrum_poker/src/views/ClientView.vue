<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, onUpdated } from "vue";
import $ from "jquery";
import startup from "../js/client";

export default defineComponent({
  name: "ClientView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      await router.isReady();
      if (route.query.issue && !Array.isArray(route.query.issue)) {
        startup(route.query.issue);
      }
    });
    onUpdated(async () => {
      await router.isReady();
      if (route.query.issue && !Array.isArray(route.query.issue)) {
        startup(route.query.issue);
      }
    });
  },
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
  <h2>Issue code: {{ $route.query.issue }}</h2>

  <template v-if="!$route.query.issue">
    <h1 style="color: red">[ERROR]: Must set an issue id</h1>
  </template>
  <template v-else>
    <div id="instrucciones">
      <div id="i-nombre-y-conectar">
        <p id="txt-conectar" style="font-size: medium">
          Poné tu nombre y clickeá en 'Conectar'
        </p>
        <p id="txt-votar" style="font-size: medium; display: none">
          Elegí tu voto
        </p>
        <p id="txt-esperar" style="font-size: medium; display: none">
          Aguardá que el SM cierre la votación
        </p>
      </div>
    </div>
    <input type="text" id="name" placeholder="Ingrese su nombre" />
    <input
      type="button"
      id="conectar-btn"
      class="btn btn-lg btn-primary"
      value="Conectar"
    />
    <div id="vote-btn" style="display: flex; flex-direction: column">
      <input
        type="button"
        id="XS-btn"
        class="btn btn-lg btn-primary"
        value="XS"
        disabled
      />
      <input
        type="button"
        id="S-btn"
        class="btn btn-lg btn-primary"
        value="S"
        disabled
      />
      <input
        type="button"
        id="M-btn"
        class="btn btn-lg btn-primary"
        value="M"
        disabled
      />
      <input
        type="button"
        id="L-btn"
        class="btn btn-lg btn-primary"
        value="L"
        disabled
      />
      <input
        type="button"
        id="XL-btn"
        class="btn btn-lg btn-primary"
        value="XL"
        disabled
      />
    </div>
  </template>
</template>
