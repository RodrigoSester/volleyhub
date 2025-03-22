<template>
  <ion-page class="teams-page">
    <ion-header class="">
      <ion-toolbar class="teams-page__header__toolbar">
        <ion-title class="teams-page__header__title">Meus times</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content />
      </ion-refresher>

      <ion-grid v-if="loading" style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <ion-spinner style="height: 64px; width: 64px;" />
      </ion-grid>
      <div v-else-if="teams.length > 0 && !loading">
        <ion-card
          v-for="team in teams"
          :key="team.id"
          @click="openRegisterTeamModal(team.id)"
        >
          <img :src="team.flag_url" alt="Team" style="height: 200px; width: 100%">
          <ion-card-header style="display: flex; justify-items: center;">
            <ion-row>
              <div style="width: 80%;">
                <ion-card-title>{{ team.name }}</ion-card-title>
                <ion-card-subtitle>{{ team.modality }}</ion-card-subtitle>
              </div>
              <div style="width: 20%;">
                <ion-button 
                  shape="round" 
                  fill="outline"
                  @click.stop="deleteTeam(team.id)"
                >
                  <ion-icon :icon="trashBinOutline" slot="icon-only" />
                </ion-button>
              </div>
            </ion-row>
          </ion-card-header>
        </ion-card>
      </div>
      <ion-card v-else class="teams-page__empty-card">
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-icon :icon="alertCircleOutline" style="font-size: 64px;" class="teams-page__empty-card__title" />
              <ion-label>
                <ion-card-title class="teams-page__empty-card__title">
                  Ainda não há times!
                </ion-card-title>
                <ion-card-subtitle style="margin-top: 4px;" class="teams-page__empty-card__subtitle">
                  Adicione um para começar
                </ion-card-subtitle>
              </ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openRegisterTeamModal">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <RegisterTeamModal
      ref="registerTeamModal" 
      :dataTeam="team"
      @refresh="handleRefresh"
    />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { axiosInstance } from '../config/axios.config';
import { add, alertCircleOutline, trashBinOutline } from 'ionicons/icons';
import { showToast } from '../helper/toast.helper';
import RegisterTeamModal from '../components/teams/Form.vue';

export default defineComponent({
  name: 'TeamsPage',
  components: {
    RegisterTeamModal,
  },
  data() {
    return {
      alertCircleOutline,
      trashBinOutline,
      add,
      loading: false,
      loadingDelete: false,
      team: {},
      teams: [],
    };
  },
  created() {
    this.fetchUserTeams();
  },
  methods: {
    openRegisterTeamModal(teamId = null) {
      if (teamId) {
        this.team = this.teams.find((team) => team.id === teamId);
        this.$refs.registerTeamModal.open();
        return;
      }

      this.$refs.registerTeamModal.open();
    },
    async handleRefresh(event) {
      await this.fetchUserTeams();

      if (event) {
        event.detail.complete();
      }
    },
    async fetchUserTeams() {
      this.loading = true;

      try {
        const response = await axiosInstance.get('/user/teams');
  
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

<style scoped lang="scss">
.teams-page {
  &__header {
    border-bottom-left-radius: 8px;

    &__toolbar {
      --background: var(--ion-background-color);
      --color: var(--ion-color-light);
      height: 80px
    }

    &__title {
      font-family: 'Sora';
      font-size: 24px;
      font-weight: bold;
      color: var(--ion-text-color);
    }
  }

  &__empty-card {
    --background: var(--ion-background-item-list);
    border: 2px solid var(--ion-background-color-800);
    border-radius: 8px;
    height: 200px;
    align-content: center;

    &__title {
      color: var(--ion-text-color);
      font-size: 24px;
      font-weight: 700;
    }

    &__subtitle {
      color: var(--ion-text-color-600);
      font-weight: 700;
      font-size: 14px;
    }
  }
}
</style>