<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Times</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher @ionRefresh="handleRefresh($event)">
        <ion-refresher-content />
      </ion-refresher>

      <ion-grid v-if="loading" style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <ion-spinner style="height: 64px; width: 64px;" />
      </ion-grid>
      <div v-else-if="teams.length > 0 && !loading">
        <ion-card
          v-for="team in teams"
          :key="team.id"
        >
          <img :src="team.flag" alt="Team" style="height: 200px; width: 100%">
          <ion-card-header>
            <ion-card-title>{{ team.name }}</ion-card-title>
            <ion-card-subtitle>{{ team.modality }}</ion-card-subtitle>
            <ion-button shape="round" fill="outline" @click="deleteTeam(team.id)">
              <ion-icon :icon="trashBinOutline" />
            </ion-button>
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
import { alertCircleOutline, trashBinOutline } from 'ionicons/icons';
import { showToast } from '../helper/toast.helper';

export default defineComponent({
  name: 'TeamsPage',
  data() {
    return {
      alertCircleOutline,
      trashBinOutline,
      loading: false,
      loadingDelete: false,
      teams: [],
    };
  },
  created() {
    this.fetchUserTeams();
  },
  methods: {
    async handleRefresh(event) {
      await this.fetchUserTeams();
      event.detail.complete();
    },
    async fetchUserTeams() {
      this.loading = true;

      try {
        const response = await axiosInstance.get('/teams');
  
        const data = response.data.body;
        this.teams = data;
      } catch (error) {
        showToast('Erro ao buscar times');
      } finally {
        this.loading = false;
      }
    },

    async deleteTeam(teamId) {
      this.loadingDelete = true;

      try {
        await axiosInstance.delete(`/teams/${teamId}`);
        this.fetchUserTeams();
      } catch (error) {
        showToast('Erro ao deletar time');
      } finally {
        this.loadingDelete = false;
      }
    }
  }
});
</script>