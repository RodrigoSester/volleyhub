<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login">
        <ion-grid class="login__form" style="align-content: center">
          <ion-row>
            <h1 class="login__title">
              VolleyHub
            </h1>
            <ion-col size="12" class="ion-no-padding">
              <ion-label class="login__form__label">
                E-mail:
              </ion-label>
              <ion-input
                ref="inputEmail"
                style="margin-top: 4px;"
                class="login__form__input"
                type="email"
                inputmode="email"
                fill="outline"
                placeholder="example@email.com"
                error-text="E-mail inválido"
                required
                @ionBlur="markTouched('inputEmail')"
                @input="handleInput('email', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-padding-top">
              <ion-label class="login__form__label">
                Password:
              </ion-label>
              <ion-input
                ref="inputPassword"
                style="margin-top: 4px"
                class="login__form__input"
                :type="showPassword ? 'text' : 'password'"
                fill="outline"
                error-text="Senha é obrigatória"
                required
                @ionBlur="markTouched('inputPassword')"
                @input="handleInput('password', $event.target.value)"
              >
                <ion-icon
                  slot="end"
                  style="cursor: pointer"
                  :icon="showPassword ? eyeOff : eye"
                  @click="showPassword = !showPassword"
                />
              </ion-input>
            </ion-col>
            <ion-col size="12" class="ion-no-padding">
              <ion-button
                expand="block"
                fill="solid"
                class="ion-margin-vertical login__form__button-confirm"
                @click="login"
              >
                Login
              </ion-button>
              <ion-button
                expand="block"
                fill="outline"
                class="login__form__button-cancel"
                router-direction="forward"
                @click="goToRegisterPage"
              >
                Criar Conta
              </ion-button>
            </ion-col>

            <!-- <ion-label class="ion-margin-top login__forgot-password">
              Esqueceu a senha?
            </ion-label> -->
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <ion-loading
      spinner="circular"
      :is-open="loading"
      :translucent="true"
    />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { axiosInstance, setToken } from '../config/axios.config';
import { showErrorToast } from '../helper/toast.helper';
import { debounce } from 'lodash';
import { eye, eyeOff } from 'ionicons/icons';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      eye,
      eyeOff,
      loading: false,
      showPassword: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    goToRegisterPage() {
      for (const key in this.user) {
        this.$refs[`input${this.getUserPropertyInputKey(key)}`].$el.classList.remove('ion-invalid');
      }
      this.$router.push('/register');
    },
    markTouched(reference) {
      this.$refs[reference].$el.classList.add('ion-touched');
    },
    getUserPropertyInputKey(key) {
      return key.charAt(0).toUpperCase() + key.slice(1)
    },
    validateEmail: debounce((context, email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return context.$refs.inputEmail.$el.classList.add('ion-invalid');
      }

      context.$refs.inputEmail.$el.classList.remove('ion-invalid');
    }, 1000),
      handleInput(key, value) {
        this.$refs[`input${this.getUserPropertyInputKey(key)}`].$el.classList.remove('ion-invalid');
  
        if (key === 'email') {
          this.validateEmail(this, value);
        }
  
        this.user[key] = value;
      },
    validateForm() {
      for (const userProperty in this.user) {
        if (!this.user[userProperty]) {
          this.markTouched(`input${this.getUserPropertyInputKey(userProperty)}`);
          this.$refs[`input${this.getUserPropertyInputKey(userProperty)}`].$el.classList.add('ion-invalid');
        }
      }

      return (this.user.email && this.user.password);
    },
    async login() {
      if (!this.validateForm()) {
        return showErrorToast('Há erros no preenchimento. Revise os campos e tente novamente.');
      }

      this.loading = true;

      try {
        const body = {
          email: this.user.email,
          password: this.user.password,
        };

        const response = await axiosInstance.post('/auth/login', body);

        setToken(response.data.body);
        this.$router.push('/home');
      } catch (error) {
        showErrorToast('Erro ao fazer login. Verifique seu e-mail e senha.');
      } finally {
        this.loading = false;
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

  &__title {
    font-family: 'Sora'; 
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
  }

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
      height: 40px;
      --background: var(--ion-background-color-800);
      --color: var(--ion-dark-text-color);
      --border-radius: 4px;
    }

    &__button-cancel {
      height: 40px;
      --border-color: var(--ion-background-color-800);
      --color: var(--ion-background-color-800);
      --border-radius: 4px;
    }
  }

  &__forgot-password {
    font-family: 'Sora';
    font-size: 12px;
    font-weight: 700;
    color: var(--ion-text-color-600) !important;
  }
}
</style>
