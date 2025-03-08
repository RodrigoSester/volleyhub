<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login">
        <ion-grid class="login__form" style="align-content: center">
          <ion-row>
            <h1 style="font-family: 'Sora'; font-weight: 700; margin-bottom: 20px;">
              VolleyHub
            </h1>
            <ion-col size="12">
              <ion-label class="login__form__label">
                Email
              </ion-label>
              <ion-input
                style="margin-top: 4px;"
                class="login__form__input"
                type="email"
                inputmode="email"
                fill="outline"
                placeholder="example@email.com"
                required
                @input="validateEmail($event.target.value)"
              />
            </ion-col>
            <ion-col size="12">
              <ion-label class="login__form__label">
                Password
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                class="login__form__input"
                :type="showPassword ? 'text' : 'password'"
                fill="outline"
                required
                @input="password = $event.target.value"
              >
                <ion-icon
                  slot="end"
                  :icon="showPassword ? 'eye-off' : 'eye'"
                  @click="showPassword = !showPassword"
                  style="cursor: pointer"
                />
              </ion-input>
            </ion-col>
            <ion-col size="12">
              <ion-button
                expand="block"
                fill="solid"
                class="login__form__button-confirm"
                @click="login"
              >
                Login
              </ion-button>
              <ion-button
                expand="block"
                fill="outline"
                class="login__form__button-cancel"
                routerLink="/register"
              >
                Criar Conta
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
      showPassword: false,
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

        setToken(response.data.body);
        this.$router.push('/home');
      } catch (error) {
        console.error(error);
        showToast('Erro ao fazer login');
      }
    },
  }
});

</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__form {
    width: 100%;
    max-width: 400px;
    padding: 20px;

    &__label {
      font-family: 'Sora';
      font-weight: 700;
    }

    &__input {
      --border-color: var(--ion-background-color-800);
    }

    &__input.has-focus {
      --border-color: var(--ion-background-color-600);
    }

    &__button-confirm {
      --background: var(--ion-background-color-800);
      --color: var(--ion-dark-text-color);
      --border-radius: 4px;
    }

    &__button-cancel {
      --border-color: var(--ion-background-color-800);
      --color: var(--ion-background-color-800);
      --border-radius: 4px;


    }
  }
}
</style>
