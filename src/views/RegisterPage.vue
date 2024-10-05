<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <div class="container">
        <h1>
          VolleyHub
        </h1>
        <ion-card style="overflow: scroll; border-radius: 8px;">
          <ion-card-header>
            <ion-card-title>
              Registrar conta
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-grid class="form" style="align-content: center;">
              <ion-row style="justify-content: center;">
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
                  <ion-select
                    label="Idade"
                    :interface-options="customActionSheetOptions"
                    interface="action-sheet"
                    placeholder="Select One"
                  >
                    <ion-select-option
                      v-for="age in 100"
                      :key="age"
                      :value="age"
                    >
                      {{ age }}
                    </ion-select-option>
                  </ion-select>
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
          </ion-card-content>
        </ion-card>
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
      phone: '',
      document: '',
      age: 0,
      openActionSheet: false,
    };
  },
  methods: {
    inputName(value) {
      this.name = value;
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return showToast('Invalid email');
      }

      this.inputEmail(email);
    },
    inputEmail(value) {
      this.email = value;
    },
    inputPassword(value) {
      this.password = value;
    },
    inputPhone(value) {
      this.phone = value;
    },
    inputDocument(value) {
      this.document = value;
    },
    inputAge(value) {
      this.age = value;
    },
    async register() {
      try {
        const body = {
          age: this.age,
          name: this.name,
          phone: this.phone,
          email: this.email,
          password: this.password,
          document: this.document,
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

.action-sheet-wrapper {
  position: fixed;
}

.action-sheet-container {
  max-height: 300px;
}
</style>