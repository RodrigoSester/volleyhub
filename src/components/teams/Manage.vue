<template>
  <ion-modal ref="manageTeamModal" trigger="open-manage-team-modal">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>{{ team.name }}</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="confirm()">
            <ion-icon :icon="pencil" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="Enter your name"
          label-placement="stacked"
          ref="input"
          type="text"
          placeholder="Your name"
        ></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script>
import { pencil } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ManageTeamPage',
  props: {
    teamId: String,
  },
  data() {
    return {
      pencil,
      team: {
        name: 'Weber teams',
        description: '',
      },
    };
  },
  created() {
    console.log(this.teamId);
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    cancel() {
      this.isOpen = false;
    },
    confirm() {
      this.$refs.modal.dismiss();
    },
  }
});
</script>