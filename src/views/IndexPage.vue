<template>
  <ion-tabs>
    <ion-router-outlet />
    <ion-tab-bar>
      <ion-tab-button 
        v-for="page in appPages" 
        :key="page.id"
        :tab="page.title"
        :href="page.path"
      >
        <ion-icon />
        <ion-label>{{ page.title }}</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      appPages: [],
    };
  },
  mounted() {
    this.setPages();
  },
  methods: {
    setPages() {
      this.appPages = [
        {
          id: 'home',
          title: 'Home',
          path: '/home',
          icon: 'home'
        },
        {
          id: 'teams',
          title: 'Team',
          path: '/teams',
          icon: 'people'
        },
        {
          id: 'games',
          title: 'Calendário de jogos',
          path: '/games',
          icon: 'calendar'
        },
        {
          id: 'profile',
          title: 'Profile',
          path: '/profile',
          icon: 'person'
        }
      ];
    }
  }
});
</script>