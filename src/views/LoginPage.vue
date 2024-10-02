<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <ion-grid class="form" style="align-content: center">
          <ion-row>
            <h1>
              VolleyHub
            </h1>
            <ion-col size="12">
              <ion-label>
                Email
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="email"
                placeholder="example@email.com"
                fill="outline"
                error-text="Invalid email"
                required
                @ionInput="validateEmail($event.target.value)"
              />
            </ion-col>
            <ion-col size="12">
              <ion-label>
                Password
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="password"
                fill="outline"
                required
              />
            </ion-col>
            <ion-col size="12">
              <ion-button
                expand="block"
                fill="solid"
                color="primary"
                routerLink="/home"
              >
                Login
              </ion-button>
              <ion-button
                expand="block"
                fill="outline"
                color="secondary"
                routerLink="/register"
              >
                <ion-label>
                  Criar Conta
                </ion-label>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('Invalid email');
      }
    },
  }
});

</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
