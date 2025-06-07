<template>
  <ion-modal trigger="open-modal" class="block invite-player" :initial-breakpoint="1" :breakpoints="[0, 1]">
    <div class="invite-player__content ion-padding">
      <h2 class="invite-player__content__header">
        Convidar Jogador
      </h2>
      <p class="invite-player__content__subheader">
        Copie o link abaixo e envie para o jogador que deseja convidar.
      </p>
      <ion-input
        class="invite-player__content__textarea"
        readonly
        fill="outline"
        :value="link"
      />
      <ion-button fill="outline" color="var(--ion-background-color-800)" class="invite-player__content__button" @click="copyLink">
        Copiar link
      </ion-button>

      <span class="invite-player__content__subheader">
        O link expirará em 24 horas.
      </span>
    </div>
  </ion-modal>
</template>

<script>
import { showErrorToast, showSuccessToast } from '../../helper/toast.helper';
export default {
  props: {
    teamId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    link() {
      const timestamp = Math.floor(Date.now() / 1000);
      return `${import.meta.env.VITE_API_URL}/teams/invite?expiration=${timestamp}&teamId=${this.teamId}`;
    }
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(this.link).then(() => {
        showSuccessToast('Link copiado para a área de transferência');
      }).catch(err => {
        showErrorToast('Erro ao copiar o link: ' + err);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
ion-modal {
  --height: 300px;
}

ion-modal::part(backdrop) {
  background: rgba(0, 0, 0, 0.4);
}

.invite-player {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
    background: var(--ion-background-color);
    color: var(--ion-text-color);
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    line-height: 1.5;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    

    &__header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__subheader {
      margin-bottom: 20px;
      color: var(--ion-text-color-400);
    }

    &__textarea {
      margin-bottom: 20px;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: var(--ion-text-color);
      background: var(--ion-background-color-200);
      border-radius: 8px;
      padding: 0px;
    }

    &__button {
      font-size: 16px;
      font-weight: bold;
      color: var(--ion-background-color-800);
    }
  }
}
</style>