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
            <ion-label class="form__content__label">Título:*</ion-label>
            <ion-input
              ref="inputName"
              v-model="team.name"
              style="margin-top: 4px"
              placeholder="Título do time"
              fill="outline"
              error-text="Campo obrigatório"
              required
              @ionBlur="markTouched('inputName')"
              @input="handleInput('name', $event.target.value)"
            />
          </ion-col>
          <ion-col size="4">
            <ion-label class="form__content__label">Abreviação:*</ion-label>
            <ion-input
              ref="inputAbbreviation"
              v-model="team.abbreviation"
              style="margin-top: 4px"
              placeholder="XXXXX"
              fill="outline"
              error-text="Campo obrigatório"
              maxlength="5"
              required
              @ionBlur="markTouched('inputAbbreviation')"
              @input="handleInput('abbreviation', $event.target.value)"
            />
          </ion-col>
          <ion-col size="12">
            <ion-label class="form__content__label">Modalidade:*</ion-label>
            <ion-select
              ref="inputModality"
              v-model="team.modality"
              :disabled="team.id"
              justify="space-between"
              fill="outline"
              interface="popover"
              aria-label="Modalidade"
              placeholder="Modalidade"
              error-text="Campo obrigatório"
              required
              @ionBlur="markTouched('inputModality')"
              @ionChange="handleInput('modality', $event.target.value)"
            >
              <ion-select-option value="male">Masculino</ion-select-option>
              <ion-select-option value="female">Feminino</ion-select-option>
              <ion-select-option value="mixed">Misto</ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col size="12">
            <ion-label class="form__content__label">Mensalidade:*</ion-label>
            <ion-input
              ref="inputMonthlyFee"
              v-model="team.monthlyFee"
              style="margin-top: 4px"
              placeholder="R$ 0,00"
              fill="outline"
              error-text="Campo obrigatório"
              required
              @ionBlur="markTouched('inputMonthlyFee')"
              @input="handleInput('monthlyFee', $event.target.value)"
            >
              <span slot="start" aria-hidden="true">
                R$
              </span>
            </ion-input>
          </ion-col>
          <ion-col size="12">
            <ion-label class="form__content__label">Bandeira:*</ion-label>
            <ion-button ref="inputFlagUrl" @click="openGallery" />
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
import { showErrorToast, showSuccessToast } from '../../helper/toast.helper';
import { arrowBack, checkmarkOutline } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
        name: null,
        abbreviation: null,
        modality: null,
        flagUrl: null,
        monthlyFee: null,
      },
    };
  },
  watch: {
    dataTeam(value) {
      const data = JSON.parse(JSON.stringify(value));

      if (!Object.is(data, {})) {
        this.team = {
          name: data.name,
          abbreviation: data.abbreviation,
          modality: data.modality,
          flagUrl: data.flag_url,
          monthlyFee: data.monthly_fee,
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
        flagUrl: '',
        monthlyFee: null,
      };
    },
    markTouched(reference) {
      this.$refs[reference].$el.classList.add('ion-touched');
    },
    getPropertyInputKey(key) {
      return key.charAt(0).toUpperCase() + key.slice(1)
    },
    openGallery () {
      Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        presentationStyle: 'popover',
      }).then((image) => {
        this.team.flagUrl = image.base64String;
      }).catch((error) => {
        console.error(error);
      });
    },
    handleInput(key, value) {
      this.$refs[`input${this.getPropertyInputKey(key)}`].$el.classList.remove('ion-invalid');
      this.team[key] = value;
    },
    validateForm() {
      for (const teamProperty in this.team) {
        if (!this.team[teamProperty]) {
          const inputKey = `input${this.getPropertyInputKey(teamProperty)}`;
          this.markTouched(inputKey);
          this.$refs[inputKey].$el.classList.add('ion-invalid');
        }
      }

      return (
        this.team.name &&
        this.team.abbreviation &&
        this.team.modality &&
        this.team.monthlyFee
      );
    },
    async handleSave() {
      if (!this.validateForm()) {
        showErrorToast('Há erros no preenchimento. Revise os campos e tente novamente.');
        return;
      }

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

        showSuccessToast('Conta criada com sucesso!');
        this.$emit('refresh');
        this.close();
      } catch (error) {
        console.error(error);
        showErrorToast('Erro ao adicionar time');
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