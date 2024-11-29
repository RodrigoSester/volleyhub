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
      matches: [],
    }
  },
  mounted() {
    this.generateMatches();
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
    generateMatches() {
      function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      function getRandomTime() {
        const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `${hour}:${minute}`;
      }

      function generateRandomMatch() {
        const types = ['tournament', 'training', 'friendly_match', 'leisure'];
        const modalities = ['male', 'female', 'mixed'];
        return {
          name: `Match ${Math.floor(Math.random() * 100)}`,
          type: getRandomElement(types),
          modality: getRandomElement(modalities),
          startTime: getRandomTime(),
          endTime: getRandomTime(),
        };
      }

      for (let i = 0; i < 10; i++) {
        this.matches.push(generateRandomMatch());
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