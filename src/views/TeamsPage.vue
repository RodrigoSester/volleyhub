<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Teams</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="teams.length > 0">
        <ion-card
          v-for="team in teams"
          :key="team.id"
        >
          <img :src="team.flag" alt="Team" style="height: 200px; width: 100%">
          <ion-card-header>
            <ion-card-title>{{ team.name }}</ion-card-title>
            <ion-card-subtitle>{{ team.modality }}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </div>
      <ion-card v-else>
        <ion-grid>
          <ion-row>
            <ion-col style="text-align: center;">
              <ion-icon :icon="alertCircleOutline" style="font-size: 64px;" />
              <ion-label>
                <ion-card-title>
                  Nenhum time encontrado
                </ion-card-title>
                <ion-card-subtitle style="margin-top: 4px;">
                  Adicione um time para começar
                </ion-card-subtitle>
              </ion-label>
              <ion-button style="margin-top: 16px;">
                Adicionar time
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { axiosInstance } from '../config/axios.config';
import { alertCircleOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TeamsPage',
  data() {
    return {
      alertCircleOutline,
      teams: [],
    };
  },
  created() {
    this.fetchUserTeams();
  },
  methods: {
    async fetchUserTeams() {
      const response = await axiosInstance.get('/teams');
      const data = response.data.body;
      this.teams = data;
    }
  }
});
</script>