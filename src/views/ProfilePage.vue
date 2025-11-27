<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile's page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="signOut">Sign Out</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import storageConfig from '../config/storage.config';

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const router = useRouter();
    const signOut = async () => {
      await storageConfig.remove('token');
      await storageConfig.remove('refreshToken');
      router.go('/login');
    };
    return { signOut };
  },
});
</script>