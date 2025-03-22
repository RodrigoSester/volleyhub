<template>
  <ion-modal :is-open="isOpen" class="form">
    <ion-header class="form__header">
      <ion-toolbar class="form__header__toolbar">
        <ion-row class="ion-justify-content-between">
          <ion-button class="ion-margin-start form__header__back-button" router-direction="back" @click="close">
            <ion-icon slot="icon-only" :icon="arrowBack" />
          </ion-button>
          <ion-title class="form__header__toolbar__title ion-text-center">{{ team.id ? "Editar time" : "Registrar time" }}</ion-title>
          <ion-button class="ion-margin-end form__header__back-button" @click="save">
            <ion-icon slot="icon-only" :icon="checkmarkOutline" />
          </ion-button>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding form__content">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-label class="form__content__label">Título:</ion-label>
            <ion-input
              v-model="team.name"
              style="margin-top: 4px"
              placeholder="Título do time"
              fill="outline"
              required
            />
          </ion-col>
          <ion-col size="4">
            <ion-label class="form__content__label">Abreviação:</ion-label>
            <ion-input
              v-model="team.abbreviation"
              style="margin-top: 4px"
              placeholder="XXXXX"
              fill="outline"
              required
            />
          </ion-col>
          <ion-col size="12">
            <ion-label class="form__content__label">Modalidade:</ion-label>
            <ion-select 
              v-model="team.modality"
              :disabled="team.id"
              justify="space-between"
              fill="outline"
              interface="popover"
              aria-label="Modalidade"
              placeholder="Modalidade"
            >
              <ion-select-option value="male">Masculino</ion-select-option>
              <ion-select-option value="female">Feminino</ion-select-option>
              <ion-select-option value="mixed">Misto</ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col size="12">
            <ion-label class="form__content__label">Mensalidade:</ion-label>
            <ion-input
              v-model="team.monthly_fee"
              style="margin-top: 4px"
              placeholder="R$ 0,00"
              fill="outline"
              required
            />
          </ion-col>
          <ion-col size="12">
            <ion-label class="form__content__label">Bandeira:</ion-label>
            <ion-input
              v-model="team.flag_url"
              style="margin-top: 4px"
              placeholder="Link da imagem"
              fill="outline"
              required
            />
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab class="form__content__button" slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="handleSave">
          <ion-icon :icon="checkmarkOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { axiosInstance } from '../../config/axios.config';
import { showToast } from '../../helper/toast.helper';
import { arrowBack, checkmarkOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'ModalRegisterTeam',
  props: {
    dataTeam: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      arrowBack,
      checkmarkOutline,
      isOpen: false,
      team: {
        id: null,
        name: '',
        abbreviation: '',
        modality: '',
        flag_url: '',
        monthly_fee: 0,
      },
    };
  },
  watch: {
    dataTeam(value) {
      const data = JSON.parse(JSON.stringify(value));

      if (data) {
        this.team = {
          id: data.id,
          name: data.name,
          abbreviation: data.abbreviation,
          modality: data.modality,
          flag_url: data.flag_url,
          monthly_fee: data.monthly_fee,
        };
      }
    }
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.resetForm();
      this.isOpen = false;
    },
    resetForm() {
      this.team = {
        id: null,
        name: '',
        abbreviation: '',
        modality: '',
        flag_url: '',
        monthly_fee: null,
      };
    },
    async handleSave() {
      this.loading = true;

      try {
        const body = {
          ...this.team,
        };

        if (this.team.id) {
          await axiosInstance.put(`/teams/${this.team.id}`, body);
        } else {
          delete body.id;
          await axiosInstance.post('/teams', body);
        }

        this.$emit('refresh');
        this.close();
      } catch (error) {
        console.error(error);
        showToast('Erro ao adicionar time');
      } finally {
        this.loading = false;
      }
    }
  },
});
</script>

<style scoped lang="scss">
.form {
  &__header {
    &__toolbar {
      --background: var(--ion-background-color);
      display: flex;

      &__title {
        font-family: 'Sora';
        font-size: 24px;
        font-weight: 700;
        color: var(--ion-text-color);
      }
    }

    &__back-button {
      --background: none;
      --box-shadow: none;
      --border-radius: 50%;
      --color: var(--ion-text-base-color);
      font-size: 16px;
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