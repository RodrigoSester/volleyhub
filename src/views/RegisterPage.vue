<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <div class="container">
        <ion-grid class="form" style="align-content: center;">
          <ion-row style="justify-content: center;">
            <h1>
              VolleyHub
            </h1>
            <ion-col size="12">
              <ion-label>
                Nome:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="email"
                fill="outline"
                required
                @input="inputName($event.target.value)"
              />
            </ion-col>
            <ion-col size="12">
              <ion-label>
                Email:
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
                Número:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="tel"
                placeholder="(99) 99999-9999"
                fill="outline"
                error-text="Invalid phone number"
                required
                @input="inputPhone($event.target.value)"
              />
            </ion-col>
            <ion-col size="12">
              <ion-label>
                Documento:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                placeholder="000.000.000-00"
                fill="outline"
                error-text="Invalid document"
                required
                @input="inputDocument($event.target.value)"
              />
            </ion-col>
            <ion-col size="12">
              <ion-label>
                Idade:
              </ion-label>
              <ion-input />
            </ion-col>
            <ion-col size="12">
              <ion-label>
                Senha:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="password"
                fill="outline"
                required
                @input="inputPassword($event.target.value)"
              />
            </ion-col>
            <ion-button expand="block" @click="register()">Register</ion-button>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { axiosInstance, setToken } from '../config/axios.config.js';
import { showToast } from '../helper/toast.helper';

export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const body = {
          name: this.name,
          email: this.email,
          password: this.password,
        }

        const response = await axiosInstance.post('/auth/register', body);

        setToken(response.data.body);
        this.$router.push('/home');
      } catch (error) {
        showToast('An error occurred while trying to register');
      }
    },
  },
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