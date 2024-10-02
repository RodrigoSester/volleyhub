<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

h1 {
  font-family: Poppins, sans-serif;
  font-size: 24px;
}

ion-label {
  font-family: Poppins, sans-serif;
  font-size: 14px;
}
</style>
