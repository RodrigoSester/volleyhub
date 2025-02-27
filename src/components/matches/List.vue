<template>
  <ion-refresher slot="fixed" @ionRefresh="fetch($event)">
    <ion-refresher-content />
  </ion-refresher>
  <ion-list>
    <ion-item v-for="(match, index) in matches" :key="index">
      <ion-label>
        <ion-row>
          <ion-col size="1" style="align-content:center; justify-content:center;">
            <ion-icon :icon="getIcon(match.type)" style="font-size: 24px;" />
          </ion-col>
          <ion-col size="11" style="padding-left: 12px;">
            <h2>{{ match.name }}</h2>
            <p>{{ match.type }} &bull; {{ match.modality }} &bull; {{ match.startTime }}h - {{ match.endTime }}h</p>
          </ion-col>
        </ion-row>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { defineComponent } from 'vue';
import { trophyOutline, peopleOutline, clipboardOutline } from 'ionicons/icons';
import { showToast } from '../../helper/toast.helper';
import { axiosInstance } from '../../config/axios.config';

export default defineComponent({
  name: 'ListMatchesPage',
  data() {
    return {
      trophyOutline,
      peopleOutline,
      clipboardOutline,
      matches: [],
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    getIcon(type) {
      switch (type) {
        case 'tournament':
          return this.trophyOutline;
        case 'training':
          return this.clipboardOutline;
        case 'friendly_match':
        case 'leisure':
          return this.peopleOutline;
        default:
          return this.peopleOutline;
      }
    },
    async fetch(refreshEvent) {
      this.loading = true;

      try {
        const response = await axiosInstance.get('/user/matches');
  
        const data = response.data.body;
        this.matches = data;
      } catch (error) {
        showToast('Erro ao buscar times');
      } finally {
        if (refreshEvent) {
          refreshEvent.target.complete();
        }

        this.loading = false;
      }
    },
  }
});
</script>

<style scoped>
ion-list, ion-item, ion-label {
  --background: var(--ion-background-color);
}

ion-item {
  padding-right: 16px;
}
</style>