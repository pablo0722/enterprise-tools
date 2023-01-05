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
              :to="'/scrum_poker/create?issue=FAMPQNTDEV-' + jiraCode"
              ><p class="button">Create new votation for Quint</p>
            </router-link>
            <input type="button" onclick="MirgorJiraGet()" value="Display" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="box flex-right">
            <router-link
              :class="{ disabled: jiraCode == '' }"
              :to="'/scrum_poker/create?issue=FAMPVW-' + jiraCode"
              ><p class="button">Create new votation for VW</p>
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="$route.name == 'scrum_poker_Server'">
      <RouterView name="Server"></RouterView>
    </template>
  </div>
</template>
