<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title>Adicionar time</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="cancel()">Criar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Nome</ion-label>
            <ion-input></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Modalidade</ion-label>
            <ion-input></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Descrição</ion-label>
            <ion-input></ion-input>
          </ion-item>
          <ion-button expand="block">Adicionar</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalRegisterTeam',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    cancel() {
      this.close();
    },
  },
});
</script>