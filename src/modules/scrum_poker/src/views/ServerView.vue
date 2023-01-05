<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ServerView",
  mounted() {
    if (this.$route.query.issue) {
      let tag = document.getElementById("getInput");
      if (tag) {
        tag.innerText =
          "var GET_INPUT_STR = `{a: '" + this.$route.query.issue + "'}`";
      } else {
        tag = document.createElement("script");
        tag.id = "getInput";
        tag.innerText =
          "var GET_INPUT_STR = `{a: '" + this.$route.query.issue + "'}`";
        document.head.insertBefore(tag, document.head.firstChild);
      }
    }
  },
});
</script>

<template>
  <h2>Issue code: {{ $route.query.issue }}</h2>

  <div id="logs" style="display: none"></div>
  <div id="instrucciones">
    <div id="i-nombre-y-conectar">
      <p id="txt-owner" style="font-size: medium; display: none">
        Elige al owner de la votación
      </p>
      <p id="txt-close" style="font-size: medium; display: none">
        Apretá 'Cerrar Votación' para mostrar el resultado de la votación a
        todos los votantes<br />(aún permite que ingresen nuevos votos)
      </p>
      <p id="txt-reset" style="font-size: medium; display: none">
        Apretá 'Reset' para reiniciar la votación<br />(aún permite que ingresen
        nuevos votos)
      </p>
      <input
        type="button"
        id="close-btn"
        class="btn btn-lg btn-primary"
        value="Cerrar Votación"
        style="display: none"
      />
      <input
        type="button"
        id="reset-btn"
        class="btn btn-lg btn-primary"
        value="Reset"
      />
    </div>
  </div>
  <table margin="0 auto">
    <caption>
      Votation result
    </caption>
    <tbody id="clients">
      <tr>
        <th>Nombre</th>
        <th>Voto</th>
      </tr>
    </tbody>
  </table>
  <p id="txt-votacionOwner" style="font-size: medium"></p>
  <p id="txt-votacionTeam" style="font-size: medium"></p>
  <input
    style="display: none"
    type="button"
    id="copy-btn"
    class="btn btn-lg btn-primary"
    value="Copy"
  />
</template>
