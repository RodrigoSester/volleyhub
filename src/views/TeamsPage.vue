<template>
  <ion-page class="teams-page">
    <ion-header class="teams-page__header">
      <ion-toolbar class="teams-page__header__toolbar">
        <ion-title class="teams-page__header__title">Meus times</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content refreshing-spinner="bubbles" class="teams-page__refresher" />
      </ion-refresher>

      <ion-grid v-if="loading" style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <ion-spinner style="height: 64px; width: 64px;" />
      </ion-grid>
      <div v-else-if="teams.length > 0 && !loading">
        <ion-list class="teams-page__list" lines="full">
          <ion-item class="teams-page__list__header">
            <ion-label class="teams-page__list__header__label">
              Time
            </ion-label>
            <ion-label class="teams-page__list__header__label">
              Modalidade
            </ion-label>
          </ion-item>
          <ion-item 
            class="teams-page__list__item"
            v-for="team in teams" 
            :key="team.id"
          >
            <ion-label>
              {{ team.name }}
            </ion-label>
            <ion-label>
              {{ team.modality }}
            </ion-label>
            <ion-button slot="end" id="popover-button" fill="clear" class="teams-page__list__item__button">
              <ion-icon :icon="ellipsisVertical" slot="icon-only" />
            </ion-button>
            <ion-popover trigger="popover-button" :dismiss-on-select="true">
              <ion-content>
                <ion-list lines="full">
                  <ion-item class="teams-page__list__item__menu-item" :button="true" @click="openManageTeamModal(team.id)">
                    <ion-icon :icon="settingsOutline" size="small" color="ion-text-color" class="ion-margin-end teams-page__list__item__menu-item__icon" />
                      Gerenciar
                  </ion-item>
                  <ion-item class="teams-page__list__item__menu-item" :button="true" @click="openRegisterTeamModal(team.id)">
                    <ion-icon :icon="pencil" size="small" color="ion-text-color" class="ion-margin-end teams-page__list__item__menu-item__icon" />
                    Editar
                  </ion-item>
                  <ion-item class="teams-page__list__item__menu-item" :button="true" @click="deleteTeam(team.id)">
                    <ion-icon :icon="trashBinOutline" size="small" class="ion-margin-end teams-page__list__item__menu-item__icon" />
                    Excluir
                  </ion-item>
                </ion-list>
              </ion-content>
            </ion-popover>
          </ion-item>
        </ion-list>
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
      <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="teams-page__list__button">
        <ion-fab-button>
          <ion-icon :icon="add" />
        </ion-fab-button>
        <ion-fab-list side="top" class="teams-page__list__button__list">
          <button
            id="open-modal-use-link"
            class="teams-page__list__button__list__item ion-align-items-center ion-justify-content-between ion-padding-horizontal"
          >
            <ion-label class="teams-page__list__button__list__item__label">Link de convite</ion-label>
            <ion-icon :icon="link" class="teams-page__list__button__list__item__icon" />
          </button>
          <button class="teams-page__list__button__list__item ion-align-items-center ion-justify-content-between ion-padding-horizontal" @click="openRegisterTeamModal()">
            <ion-label class="teams-page__list__button__list__item__label">Criar time</ion-label>
            <ion-icon :icon="flag" class="teams-page__list__button__list__item__icon" />
          </button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
    <RegisterTeamModal
      ref="registerTeamModal" 
      @refresh="handleRefresh"
    />
    <ManageTeamModal
      ref="manageTeamModal" 
      @refresh="handleRefresh"
    />
    <Invitelink />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { add, alertCircleOutline, trashBinOutline, ellipsisVertical, pencil, settingsOutline, link, flag } from 'ionicons/icons';

import { axiosInstance } from '../config/axios.config';
import { showToast } from '../helper/toast.helper';

import ManageTeamModal from '../components/teams/Manage.vue';
import RegisterTeamModal from '../components/teams/Form.vue';
import Invitelink from '../components/teams/InviteLink.vue';

export default defineComponent({
  name: 'TeamsPage',
  components: {
    Invitelink,
    ManageTeamModal,
    RegisterTeamModal
  },
  data() {
    return {
      add,
      pencil,
      settingsOutline,
      trashBinOutline,
      ellipsisVertical,
      alertCircleOutline,
      link,
      flag,
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
      this.$refs.registerTeamModal.open(teamId);
    },
    openManageTeamModal(teamId) {
      this.$refs.manageTeamModal.open(teamId);
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
      } catch {
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
      } catch {
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
  &__refresher {
    color: var(--ion-background-color-800) !important;
  }

  &__header {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    &__toolbar {
      --background: var(--ion-background-color);
      --color: var(--ion-color-light);
      height: 80px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      display: flex;
    }

    &__title {
      font-family: 'Sora';
      font-size: 24px;
      font-weight: bold;
      color: var(--ion-text-color);
    }
  }

  &__list {
    background: none;
    padding: 0;

    &__header {
      --background: var(--ion-background-header);

      &__label {
        color: var(--ion-text-color-600) !important;
        font-weight: 700;
      }
    }

    &__item {
      --background: var(--ion-background-item-list);
      --color: var(--ion-text-color);
      font-weight: 700;

      &__button {
        color: var(--ion-text-color);
      }

      &__menu-item {
        --color: var(--ion-text-color);
        font-weight: 700;
        font-size: 14px;

        &__icon {
          color: var(--ion-text-color);
        }
      }
    }

    &__button {
      right: 32px;
      bottom: 40px;

      &__list {
        right: 0;

        &__item {
          width: 200px;
          height: 32px;
          display: flex;
          margin-bottom: 8px;
          background: var(--ion-text-green-color-600) !important;
          border: 2px solid var(--ion-text-green-color);
          border-radius: 8px !important;

          &__label {
            font-weight: 700;
            font-size: 14px;
          }

          &__icon {
            width: 16px;
            height: 16px;
            color: var(--ion-text-color) !important;
          }
        }
      }
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