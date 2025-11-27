<template>
  <ion-modal trigger="open-modal-use-link" class="block invite-link" :initial-breakpoint="1" :breakpoints="[0, 1]" @didDismiss="resetLink">
    <div class="invite-link__content ion-padding">
      <h2 class="invite-link__content__header">
        Link de Convite
      </h2>
      <p class="invite-link__content__subheader">
        Cole o link abaixo e ingresse no time.
      </p>
      <ion-input
        v-model="link"
        class="invite-link__content__textarea"
        fill="outline"
        placeholder="Cole o link aqui"
      />
      <ion-button fill="outline" color="var(--ion-background-color-800)" class="invite-link__content__button" @click="useLink">
        Ingressar no time
      </ion-button>
    </div>
  </ion-modal>
</template>

<script>
import { axiosInstance } from '../../config/axios.config';
import { showErrorToast, showSuccessToast } from '../../helper/toast.helper';
export default {
  data() {
    return {
      link: '',
    };
  },
  methods: {
    async useLink() {
      try {
        if (!this.isValidInviteLink(this.link)) {
          showErrorToast('Link de convite inválido. Verifique o link e tente novamente.');
          return;
        }

        await axiosInstance.post('/teams/join', { link: this.link });
        showSuccessToast('Você entrou no time com sucesso!');
        this.$emit('refresh');
      } catch (error) {
        showErrorToast('Erro ao entrar no time: ' + (error.response?.data?.message || error.message));
      }
    },

    isValidInviteLink(link) {
      if (!link || typeof link !== 'string') {
        return false;
      }

      const baseUrl = import.meta.env.VITE_API_URL;

      if (!link.startsWith(baseUrl)) {
        return false;
      }

      const pathAndQuery = link.substring(baseUrl.length);
      const pattern = /^\/teams\/invite\?expiration=\d+&teamId=[^&]+$/;

      return pattern.test(pathAndQuery);
    },

    resetLink() {
      this.link = '';
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

.invite-link {
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