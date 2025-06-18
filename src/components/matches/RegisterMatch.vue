<template>
  <ion-modal :is-open="open" class="form-match">
    <ion-header class="form-match__header">
      <ion-toolbar class="form-match__header__toolbar">
        <ion-row class="ion-justify-content-between">
          <ion-button class="ion-margin-start form-match__header__button" @click="$emit('close')">
            <ion-icon slot="icon-only" :icon="arrowBack" />
          </ion-button>
          <ion-title class="form-match__header__toolbar__title ion-text-center">Registrar Partida</ion-title>
          <ion-button class="ion-margin-end form-match__header__button" @click="handleSave">
            <ion-icon slot="icon-only" :icon="checkmarkOutline" />
          </ion-button>
        </ion-row>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding form-match__content">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-label class="form-match__content__label">Modalidade:*</ion-label>
            <ion-select
              ref="inputModality"
              v-model="match.modality"
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
            <ion-label class="form-match__content__label">Valor:*</ion-label>
            <ion-input
              ref="inputValue"
              v-model="match.value"
              style="margin-top: 4px"
              placeholder="0,00"
              fill="outline"
              :error-text="valueErrorText"
              required
              @ionBlur="markTouched('inputValue')"
              @input="handleValueInput($event.target.value)"
            >
              <span slot="start" aria-hidden="true">
                R$
              </span>
            </ion-input>
          </ion-col>

          <ion-col size="12">
            <ion-label class="form-match__content__label">Data e Horário:*</ion-label>
            <ion-input
              ref="inputDateTime"
              v-model="match.dateTime"
              style="margin-top: 4px"
              type="datetime-local"
              fill="outline"
              :error-text="dateTimeErrorText"
              required
              @ionBlur="markTouched('inputDateTime')"
              @input="handleDateTimeInput($event.target.value)"
            />
          </ion-col>

          <ion-col size="12">
            <ion-label class="form-match__content__label">Time adversário:</ion-label>
            <ion-select
              ref="inputTeam"
              v-model="match.teamId"
              justify="space-between"
              fill="outline"
              interface="popover"
              aria-label="Time"
              placeholder="Selecione o time adversário"
              @ionChange="handleInput('teamId', $event.target.value)"
            >
              <ion-select-option v-for="team in teams" :key="team.id" :value="team.id">
                {{ team.name }}
              </ion-select-option>
            </ion-select>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab class="form-match__content__button" slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="handleSave">
          <ion-icon :icon="checkmarkOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-modal>
</template>

<script >
import { arrowBack, checkmarkOutline } from 'ionicons/icons';
import { axiosInstance } from '../../config/axios.config';
import { showErrorToast, showSuccessToast } from '../../helper/toast.helper';

export default {
  name: 'RegisterMatch',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      arrowBack,
      checkmarkOutline,
      teams: [],
      valueErrorText: 'Campo obrigatório',
      dateTimeErrorText: 'Campo obrigatório',
      match: {
        modality: '',
        value: '',
        dateTime: '',
        teamId: null,
      },
    };
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.fetchTeams();
      }
    }
  },
  methods: {
    markTouched(reference) {
      this.$refs[reference].$el.classList.add('ion-touched');
    },
    getPropertyInputKey(key) {
      return key.charAt(0).toUpperCase() + key.slice(1)
    },
    formatValue(value) {
      const numbers = value.replace(/\D/g, '');
      
      if (!numbers) return '';

      const cents = parseInt(numbers);
      
      const formatted = (cents / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      return formatted;
    },
    
    validateValue(value) {
      if (!value) {
        this.valueErrorText = 'Campo obrigatório';
        return false;
      }
      
      const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(numericValue) || numericValue <= 0) {
        this.valueErrorText = 'Valor deve ser um número válido maior que zero';
        return false;
      }
      
      this.valueErrorText = '';
      return true;
    },
    
    validateDateTime(dateTime) {
      if (!dateTime) {
        this.dateTimeErrorText = 'Campo obrigatório';
        return false;
      }
      
      const selectedDate = new Date(dateTime);
      const now = new Date();
      const twoYearsFromNow = new Date();
      twoYearsFromNow.setFullYear(now.getFullYear() + 2);
      
      now.setSeconds(0, 0);
      selectedDate.setSeconds(0, 0);
      
      if (isNaN(selectedDate.getTime())) {
        this.dateTimeErrorText = 'Data e horário inválidos';
        return false;
      }
      
      if (selectedDate <= now) {
        this.dateTimeErrorText = 'Data deve ser posterior ao momento atual';
        return false;
      }
      
      if (selectedDate > twoYearsFromNow) {
        this.dateTimeErrorText = 'Data não pode ser superior a 2 anos';
        return false;
      }
      
      this.dateTimeErrorText = '';
      return true;
    },
    
    handleValueInput(value) {
      const formattedValue = this.formatValue(value);
      this.match.value = formattedValue;
      
      const isValid = this.validateValue(formattedValue);
      const inputEl = this.$refs.inputValue.$el;
      
      if (isValid) {
        inputEl.classList.remove('ion-invalid');
      } else {
        inputEl.classList.add('ion-invalid');
      }
    },
    
    handleDateTimeInput(value) {
      this.match.dateTime = value;
      
      const isValid = this.validateDateTime(value);
      const inputEl = this.$refs.inputDateTime.$el;
      
      if (isValid) {
        inputEl.classList.remove('ion-invalid');
      } else {
        inputEl.classList.add('ion-invalid');
      }
    },
    handleInput(key, value) {
      if (this.$refs[`input${this.getPropertyInputKey(key)}`]) {
        this.$refs[`input${this.getPropertyInputKey(key)}`].$el.classList.remove('ion-invalid');
      }
      this.match[key] = value;
    },
    async fetchTeams() {
      try {
        const response = await axiosInstance.get('/teams/not-member');
        this.teams = response.data.body || response.data;
      } catch (error) {
        console.error(error);
        showErrorToast('Erro ao buscar times');
      }
    },
    validateForm() {
      const modalityValid = !!this.match.modality;
      const valueValid = this.validateValue(this.match.value);
      const dateTimeValid = this.validateDateTime(this.match.dateTime);
      
      if (!modalityValid) {
        this.markTouched('inputModality');
        this.$refs.inputModality.$el.classList.add('ion-invalid');
      }
      
      if (!valueValid) {
        this.markTouched('inputValue');
        this.$refs.inputValue.$el.classList.add('ion-invalid');
      }
      
      if (!dateTimeValid) {
        this.markTouched('inputDateTime');
        this.$refs.inputDateTime.$el.classList.add('ion-invalid');
      }
      
      return modalityValid && valueValid && dateTimeValid;
    },
    async handleSave() {
      if (!this.validateForm()) {
        showErrorToast('Há erros no preenchimento. Revise os campos e tente novamente.');
        return;
      }

      try {
        const numericValue = parseFloat(this.match.value.replace(/\./g, '').replace(',', '.'));
        
        const body = {
          modality: this.match.modality,
          value: numericValue,
          dateTime: this.match.dateTime,
          teamId: this.match.teamId,
        };

        await axiosInstance.post('/matches', body);
        showSuccessToast('Partida criada com sucesso!');
        this.resetForm();
        this.$emit('close');
      } catch (error) {
        console.error(error);
        showErrorToast(error.message || 'Erro ao criar partida');
      }
    },
    resetForm() {
      this.match = {
        modality: '',
        value: '',
        dateTime: '',
        teamId: null,
      };
      this.valueErrorText = 'Campo obrigatório';
      this.dateTimeErrorText = 'Campo obrigatório';
    },
  }
}
</script>

<style lang="scss" scoped>
.form-match {
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

    &__button {
      --background: none;
      --box-shadow: none;
      --border-radius: 50%;
      --color: var(--ion-text-color);
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