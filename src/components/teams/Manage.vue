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
            <span class="manage-team__header__toolbar__info">{{ formatDate(team.createdAt) }}</span>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="full" class="manage-team__content__list">
        <ion-item v-for="player in team.players" :key="player.id" class="manage-team__content__item">
          <ion-col size="8" class="ion-no-padding ion-align-items-start ion-justify-content-start">
            <ion-label class="manage-team__content__label ion-text-nowrap">{{ player.name }}</ion-label>
            <span class="manage-team__content__info">Camisa {{ player.shirtNumber }}</span>
          </ion-col>
          <ion-col size="4" class="ion-no-padding manage-team__content__item__info">
            <ion-note>
              <ion-chip :class="player.isActive ? 'success' : 'inactive'">{{ player.isActive ? 'Ativo' : 'Inativo' }}</ion-chip>
            </ion-note>
          </ion-col>
           <ion-button slot="end" class="manage-team__content__item__button">
              <ion-icon slot="icon-only" :icon="ellipsisVertical" />
           </ion-button>
        </ion-item>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="manage-team__content__button">
        <ion-fab-button>
          <ion-icon :icon="arrowUp" />
        </ion-fab-button>
        <ion-fab-list side="top" class="manage-team__content__button__list">
          <button
            id="open-modal-invite-link"
            class="manage-team__content__button__list__item ion-align-items-center ion-justify-content-between ion-padding-horizontal"
          >
            <ion-label class="manage-team__content__button__list__item__label">Convidar jogador</ion-label>
            <ion-icon :icon="personAdd" class="manage-team__content__button__list__item__icon" />
          </button>
          <button class="manage-team__content__button__list__item ion-align-items-center ion-justify-content-between ion-padding-horizontal">
            <ion-label class="manage-team__content__button__list__item__label">Adicionar partida</ion-label>
            <ion-icon :icon="basketball" class="manage-team__content__button__list__item__icon" />
          </button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>

    <InvitePlayerModal :teamId="team.id" />
  </ion-modal>
</template>

<script>
import { pencil, arrowBack, ellipsisVertical, checkmarkOutline, personAdd, basketball, arrowUp } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { axiosInstance } from '../../config/axios.config';
import moment from 'moment';
import InvitePlayerModal from './InvitePlayer.vue';
import { showErrorToast } from '../../helper/toast.helper';

export default defineComponent({
  name: 'ManageTeamPage',
  components: {
    InvitePlayerModal,
  },
  data() {
    return {
      pencil,
      arrowUp,
      arrowBack,
      personAdd,
      basketball,
      checkmarkOutline,
      ellipsisVertical,
      isOpen: false,
      isOpenInvitePlayerModal: false,
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
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    async fetchTeamData(teamId) {
      try {
        const response = await axiosInstance.get(`/teams/${teamId}`);
        this.team = response.data.body;
      } catch {
        showErrorToast('Erro ao buscar dados do time');
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
        font-weight: 700;
        color: var(--ion-text-color-400) !important;
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
    &__list {
      background: var(--ion-background-item-list) !important;
    }

    &__item {
      --background: var(--ion-background-item-list);
      padding-bottom: 8px;

      &__info {
        display: flex;
        justify-content: center;
      }

      &__button {
        --background: none;
        --box-shadow: none;
        --border-radius: 50%;
        --color: var(--ion-text-base-color);
        --padding-start: 0 !important;
        --padding-end: 0 !important;
        font-size: 12px;
        width: 36px;
        height: 36px;
      }
    }

    &__label {
      font-family: 'Sora';
      font-weight: 700;
    }

    &__info {
      font-family: 'Sora';
      font-size: 12px;
      font-weight: 700;
      color: var(--ion-text-color-400) !important;
    }

    &__button {
      right: 32px;
      bottom: 40px;

      &__list {
        width: -webkit-fill-available;

        &__item {
          width: 200px;
          height: 32px;
          display: flex;
          margin-right: 100px;
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
}
</style>