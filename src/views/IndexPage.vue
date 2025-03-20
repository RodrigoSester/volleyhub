<template>
  <ion-page>
    <ion-content>
      <ion-router-outlet />
    </ion-content>

    <ion-footer class="footer">
      <ion-toolbar class="footer__toolbar">
        <ion-tab-bar class="footer__tab-bar">
          <ion-tab-button 
            class="footer__tab-bar__button"
            v-for="page in appPages" 
            :key="page.id"
            :tab="page.title"
            :href="page.path"
            @click="goToPage(page.path)"
          >
            <ion-icon :icon="page.icon" class="ion-no-margin footer__tab-bar__button__icon" />
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
import {
  home,
  people,
  calendarOutline,
  personCircleOutline
} from 'ionicons/icons';

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
      const currentPage = this.appPages.find(page => page.path === route?.path);
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
          icon: home
        },
        {
          id: 'team',
          title: 'Team',
          path: '/teams',
          icon: people
        },
        {
          id: 'matches',
          title: 'Matches',
          path: '/matches',
          icon: calendarOutline
        },
        {
          id: 'profile',
          title: 'Profile',
          path: '/profile',
          icon: personCircleOutline
        },
      ]
    },
    goToPage(path) {
      this.$router.push(path);
    }
  }
});
</script>
<style scoped lang="scss">
.footer {
  &__tab-bar {
    border: 0 !important;
    background: var(--ion-background-color) !important;

    &__button {
      border: 1px solid var(--ion-background-color-800) !important;

      &:first-child {
        border-top-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
      }

      &__icon {
        color: var(--ion-text-color);
      }
    }
  }
}
</style>