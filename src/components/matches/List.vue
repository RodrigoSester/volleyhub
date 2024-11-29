<template>
  <ion-list>
    <ion-item v-for="(match, index) in matches" :key="index">
      <ion-label>
        <ion-row>
          <ion-col size="1" style="align-content:center; justify-content:center;">
            <ion-icon :icon="getIcon(match.type)" style="font-size: 24px;" />
          </ion-col>
          <ion-col size="11">
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

export default defineComponent({
  name: 'ListMatchesPage',
  data() {
    return {
      trophyOutline,
      peopleOutline,
      clipboardOutline,
      matches: [
        { name: 'Match 1', type: 'tournament', modality: 'male', startTime: '10:00', endTime: '11:00' },
        { name: 'Match 2', type: 'training', modality: 'female', startTime: '11:00', endTime: '11:00' },
        { name: 'Match 3', type: 'friendly_match', modality: 'mixed', startTime: '12:00', endTime: '11:00' },
        { name: 'Match 4', type: 'leisure', modality: 'male', startTime: '13:00', endTime: '11:00' },
        { name: 'Match 5', type: 'leisure', modality: 'female', startTime: '14:00', endTime: '11:00' },
        { name: 'Match 6', type: 'tournament', modality: 'mixed', startTime: '15:00', endTime: '11:00' },
      ],
    }
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
  }
});
</script>

<style scoped>
ion-list, ion-item, ion-label {
  --background: var(--ion-background-color);
}
</style>