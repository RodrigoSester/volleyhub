<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ currentPageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-router-outlet />
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-tab-bar>
          <ion-tab-button 
            v-for="page in appPages" 
            :key="page.id"
            :tab="page.title"
            :href="page.path"
          >
            <ion-icon :name="page.icon" />
            <ion-label>{{ page.title }}</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      appPages: [],
    };
  },
  computed: {
    currentPageTitle() {
      const route = useRoute();
      const currentPage = this.appPages.find(page => page.path === route.path);
      return currentPage ? currentPage.title : 'App';
    }
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
          id: 'team',
          title: 'Team',
          path: '/team',
          icon: 'people'
        },
        {
          id: 'matches',
          title: 'Matches',
          path: '/matches',
          icon: 'football'
        },
        {
          id: 'profile',
          title: 'Profile',
          path: '/profile',
          icon: 'person'
        },
      ]
    }
  }
});
</script>