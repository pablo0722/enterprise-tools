<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, onUpdated, getCurrentInstance } from "vue";
import $ from "jquery";
import daily from "../js/daily";

export default defineComponent({
  name: "DailyMeeting",
  data() {
    return {
      newParticipant: "",
      newCritical: "",
      newPending: "",
      newInformation: "",
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      console.log("MOUNTED");
      await router.isReady();
      if (route.query.celda && !Array.isArray(route.query.celda)) {
        daily.onStartup(route.query.celda);
      }
    });
    onUpdated(async () => {
      if (
        getCurrentInstance()!.data.newParticipant == "" &&
        getCurrentInstance()!.data.newCritical == "" &&
        getCurrentInstance()!.data.newPending == "" &&
        getCurrentInstance()!.data.newInformation == ""
      ) {
        console.log("UPDATED");
        await router.isReady();
        if (route.query.celda && !Array.isArray(route.query.celda)) {
          daily.onStartup(route.query.celda);
        }
      }
    });
  },
  updated() {
    if (daily.needClear()) {
      this.newParticipant = "";
      this.newCritical = "";
      this.newPending = "";
      this.newInformation = "";
    }
  },
});
</script>

<template>
  <HeaderPartial></HeaderPartial>
  <div>
    <template v-if="!$route.query.celda">
      <div class="row">
        <div class="col-md-3">
          <div class="box">
            <router-link :to="'/daily_meeting?celda=FAMP1'"
              ><p class="button">FAMP: Celda 1</p>
            </router-link>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box">
            <router-link :to="'/daily_meeting?celda=FAMP2'"
              ><p class="button">FAMP: Celda 2</p>
            </router-link>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box">
            <router-link :to="'/daily_meeting?celda=FAMP3'"
              ><p class="button">FAMP: Celda 3</p>
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="panel-left">
        <h3>Participantes</h3>
        <div id="participants"></div>
        <br />
        <input
          type="text"
          id="participants-txt"
          v-model="newParticipant"
          placeholder="Nuevo participante"
          ref="input_participants"
          class="input"
        />
        <button
          :class="{ disabled: newParticipant == '' }"
          class="button-icon-red"
          id="participants-btn"
        >
          +
        </button>
      </div>
      <div class="panel-center">
        <br />
        <h3>Orden de la Daily: {{ $route.query.celda }}</h3>
        <div id="order"></div>
      </div>
      <div class="panel-center2">
        <br />
        <button class="button-primary" id="reorder-btn">Reorder</button>
        <button class="button-primary" id="prev-btn">Prev</button>
        <button class="button-primary" id="next-btn">Next</button>
        <button class="button-primary" id="end-btn">End</button>
        <br />
        <br />
        <div style="align-items: flex-start" id="timer-settings">
          <label for="Horas">Horas: </label>
          <input
            type="number"
            id="countdown_h-txt"
            placeholder="[horas]"
            class="input"
            style="width: 10%; margin-left: 1em"
            value="0"
          />
          <br />
          <label for="Minutos" style="text-align: left">Minutos: </label>
          <input
            type="number"
            id="countdown_m-txt"
            placeholder="[minutos]"
            class="input"
            style="width: 10%; margin-left: 1em"
            value="30"
          />
          <br />
          <label for="Segundos" style="text-align: left">Segundos: </label>
          <input
            type="number"
            id="countdown_s-txt"
            placeholder="[segundos]"
            class="input"
            style="width: 10%; margin-left: 1em"
            value="0"
          />
          <br />
          <button class="button-primary" id="start-btn">Start</button>
        </div>
        <p id="countdown"></p>
      </div>
      <div class="panel-right">
        <h3>Criticos</h3>
        <div id="criticals"></div>
        <br />
        <input
          type="text"
          id="criticals-txt"
          v-model="newCritical"
          placeholder="Nuevo crítico"
          ref="input_criticals"
          class="input"
        />
        <button
          :class="{ disabled: newCritical == '' }"
          class="button-icon-red"
          id="criticals-btn"
        >
          +
        </button>
        <br />
        <br />
        <h3>Pendientes</h3>
        <div id="pendings"></div>
        <br />
        <input
          type="text"
          id="pendings-txt"
          v-model="newPending"
          placeholder="Nuevo pendiente"
          ref="input_pendings"
          class="input"
        />
        <button
          :class="{ disabled: newPending == '' }"
          class="button-icon-red"
          id="pendings-btn"
        >
          +
        </button>
        <br />
        <br />
        <h3>Información</h3>
        <div id="informations"></div>
        <br />
        <input
          type="text"
          id="informations-txt"
          v-model="newInformation"
          placeholder="Nueva información"
          ref="input_informations"
          class="input"
        />
        <button
          :class="{ disabled: newInformation == '' }"
          class="button-icon-red"
          id="informations-btn"
        >
          +
        </button>
      </div>
    </template>
  </div>
</template>
