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
                @input="validateEmail($event.target.value)"
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
                @input="password = $event.target.value"
              />
            </ion-col>
            <ion-col size="12">
              <ion-button
                expand="block"
                fill="solid"
                color="primary"
                @click="login"
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
import { axiosInstance, setToken } from '../config/axios.config';
import { showToast } from '../helper/toast.helper';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('Invalid email');
      }

      this.email = email;
    },
    async login() {

      try {
        const body = {
          email: this.email,
          password: this.password,
        };

        const response = await axiosInstance.post('/auth/login', body);

        setToken(response.data.body.token);
        this.$router.push('/home');
      } catch (error) {
        console.error(error);
        showToast('Erro ao fazer login');
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
