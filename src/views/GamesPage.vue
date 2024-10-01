<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Game's page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="openMenu">Open Menu</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  methods: {
    openMenu() {
      console.log('Open menu');
    },
  },
});
</script>