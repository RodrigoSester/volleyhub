<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/home">
          <ion-icon />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="teams" href="/teams">
          <ion-icon />
          <ion-label>Team</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="games" href="/games">
          <ion-icon />
          <ion-label>Calendário de jogos</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/profile">
          <ion-icon />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>