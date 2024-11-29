<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calendário de Jogos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ListMatchesPage />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import ListMatchesPage from '../components/matches/List.vue';

export default defineComponent({
  name: 'GamesPage',
  components: {
    ListMatchesPage,
  },
  methods: {
    openMenu() {
      console.log('Open menu');
    },
  },
});
</script>

<style scoped>
ion-page, ion-content {
  background-color: var(--ion-background-color);
}
</style>