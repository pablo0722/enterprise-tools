<script lang="ts">
import HeaderPartial from "./layouts/partials/HeaderPartial.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScrumPoker",
  components: {
    HeaderPartial,
  },
  data() {
    return {
      jiraCode: "",
    };
  },
  inheritAttrs: false,
});
</script>

<template>
  <HeaderPartial></HeaderPartial>
  <div>
    <template v-if="$route.name == 'Tool'">
      <div class="row">
        <div class="col-md-12">
          <div class="box flex-center">
            <input
              type="number"
              v-model="jiraCode"
              placeholder="Jira Code Number"
              width="100%"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="box flex-right">
            <router-link
              :class="{ disabled: jiraCode == '' }"
              :to="'/scrum_poker/vote?issue=FAMPQNTDEV-' + jiraCode"
              ><p class="button">Vota un issue de Quint</p>
            </router-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="box flex-right">
            <router-link
              :class="{ disabled: jiraCode == '' }"
              :to="'/scrum_poker/vote?issue=FAMPVW-' + jiraCode"
              ><p class="button">Vota un issue de VW</p>
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="$route.name == 'scrum_poker'">
      <RouterView name="Client"></RouterView>
    </template>
    <template v-else-if="$route.name == 'scrum_poker_server'">
      <RouterView name="Server"></RouterView>
    </template>
  </div>
</template>
