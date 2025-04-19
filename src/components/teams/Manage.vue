<template>
  <ion-modal ref="manageTeamModal" :is-open="isOpen" class="manage-team">
     <ion-header class="manage-team__header">
      <ion-toolbar class="manage-team__header__toolbar">
        <ion-row class="ion-justify-content-between ion-align-items-center manage-team__header">
          <ion-button class="ion-margin-start manage-team__header__button" router-direction="back" @click="close">
            <ion-icon slot="icon-only" :icon="arrowBack" />
          </ion-button>
          <ion-col cols="8" class="d-flex ion-align-items-start ion-justify-content-center">
            <span class="manage-team__header__toolbar__info">{{ team.modality }}</span>
            <br>
            <ion-label class="manage-team__header__toolbar__title">{{ team.name }}</ion-label>
            <br>
            <span class="manage-team__header__toolbar__info">{{ team.createdAt }}</span>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="full">
        <ion-item v-for="player in team.players" :key="player.id" class="manage-team__content__item">
          <div>
            <span></span>
            <ion-label class="manage-team__content__label">Nome</ion-label>
          </div>
          <ion-note slot="end">
            <ion-chip class="warning">Pendente</ion-chip>
          </ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
import { pencil, arrowBack } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { axiosInstance } from '../../config/axios.config';

export default defineComponent({
  name: 'ManageTeamPage',
  data() {
    return {
      pencil,
      arrowBack,
      isOpen: false,
      team: {
        id: null,
        name: null,
        abbreviation: null,
        modality: null,
        monthlyFee: null,
        flagUrl: null,
        createdAt: null,
      },
    };
  },
  methods: {
    open(teamId) {
      this.isOpen = true;

      this.fetchTeamData(teamId);
    },
    close() {
      this.isOpen = false;
    },
    confirm() {
      this.$refs.modal.dismiss();
    },
    async fetchTeamData(teamId) {
      try {
        const response = await axiosInstance.get(`/teams/${teamId}`);
        this.team = response.data.body;
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    },
  }
});
</script>

<style scoped lang="scss">
.manage-team {
   &__header {
    height: 90px;

    &__toolbar {
      --background: var(--ion-background-color);
      display: flex;

      &__title {
        font-family: 'Sora';
        font-size: 14px;
        font-weight: 700;
        color: var(--ion-text-color);
      }

      &__info {
        font-family: 'Sora';
        font-size: 12px;
        font-weight: 400;
        color: var(--ion-text-color-400);
      }
    }

    &__button {
      --background: none;
      --box-shadow: none;
      --border-radius: 50%;
      --color: var(--ion-text-base-color);
      --padding-start: 0 !important;
      --padding-end: 0 !important;
      font-size: 16px;
      width: 36px;
      height: 36px;
    }
  }

  &__content {
    &__label {
      font-family: 'Sora';
      font-weight: 700;
    }

    &__button {
      right: 32px;
      bottom: 40px;
    }
  }
}
</style>