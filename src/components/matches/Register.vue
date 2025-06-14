<template>
  <ion-modal :is-open="open" class="form-match">
    <ion-header class="form-match__header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="$emit('close')">
            <ion-icon :icon="arrowBack" />
          </ion-button>
        </ion-buttons>
        <ion-title>Registrar Partida</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding form-match__content">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-label class="form__content__label">Modalidade:*</ion-label>
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
            <ion-label class="form__content__label">Mensalidade:*</ion-label>
            <ion-input
              ref="inputValue"
              v-model="match.value"
              style="margin-top: 4px"
              placeholder="R$ 0,00"
              fill="outline"
              error-text="Campo obrigatório"
              required
              @ionBlur="markTouched('inputValue')"
              @input="handleInput('value', $event.target.value)"
            >
              <span slot="start" aria-hidden="true">
                R$
              </span>
            </ion-input>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="form-match__actions">
        <ion-button expand="full" @click="$emit('save', match)">Registrar Partida</ion-button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script >
import { arrowBack } from 'ionicons/icons';

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
      match: {
        modality: '',
        value: '',
        date: '',
      },
    };
  },
  methods: {
    markTouched(reference) {
      this.$refs[reference].$el.classList.add('ion-touched');
    },
    getPropertyInputKey(key) {
      return key.charAt(0).toUpperCase() + key.slice(1)
    },
    handleInput(key, value) {
      this.$refs[`input${this.getPropertyInputKey(key)}`].$el.classList.remove('ion-invalid');
      this.match[key] = value;
    },
    handleSave() {
      if (this.validateForm()) {
        this.$emit('save', this.match);
        this.resetForm();
      }
    },
    validateForm() {
      return this.match.title && this.match.date && this.match.time;
    },
    resetForm() {
      this.match = { title: '', date: '', time: '' };
    },
  }
}
</script>

<style lang="scss" scoped>
.form-match {
  &__header {
    --background: var(--ion-background-color);
  }

  &__content {
    &__label {
      font-weight: bold;
      margin-bottom: 8px;
    }
  }

  &__actions {
    margin-top: 16px;
    text-align: center;
  }
}
</style>