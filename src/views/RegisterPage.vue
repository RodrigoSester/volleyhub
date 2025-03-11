<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <div class="register">
        <ion-row class="register__header ion-align-items-center">
          <ion-col size="3" class="ion-no-padding">
            <ion-button class="ion-margin-start register__header__back-button" router-direction="back" @click="goBack">
              <ion-icon slot="icon-only" :icon="arrowBack" @click="goBack" />
            </ion-button>
          </ion-col>
          <ion-col size="9" class="ion-no-padding">
            <h1 class="register__header__title">
              VolleyHub
            </h1>
          </ion-col>
        </ion-row>

        <ion-grid class="ion-margin register__form" style="margin-top: 100px;">
          <ion-row class="ion-justify-content-start">
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Nome:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="email"
                fill="outline"
                class="register__form__input"
                placeholder="John Doe"
                required
                @input="handleInput('name', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Email:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="email"
                placeholder="example@email.com"
                fill="outline"
                class="register__form__input"
                required
                @input="handleInput('email', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Número:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="tel"
                placeholder="(99) 99999-9999"
                fill="outline"
                class="register__form__input"
                required
                @input="handleInput('phone', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Documento:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                placeholder="000.000.000-00"
                fill="outline"
                class="register__form__input"
                required
                maxlength="11"
                @input="handleInput('document', $event.target.value)"
              />
            </ion-col>
            <ion-col size="6" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Idade:
              </ion-label>
              <ion-select
                :interface-options="customActionSheetOptions"
                interface="popover"
                placeholder="Selecione sua idade"
                justify="end"
                class="register__form__select"
                fill="outline"
                @ionChange="handleInput('age', $event.detail.value)"
              >
                <ion-select-option
                  v-for="age in (new Array(65)).fill(16).map((item, index) => item + index)"
                  :key="age"
                  :value="age"
                >
                  {{ age }}
                </ion-select-option>
              </ion-select>
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Senha:
              </ion-label>
              <ion-input
                style="margin-top: 4px"
                type="password"
                fill="outline"
                class="register__form__input"
                required
                @input="handleInput('password', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding">
              <ion-button class="ion-no-margin register__form__button-confirm" @click="register()">
                Criar conta
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
import { axiosInstance, setToken } from '../config/axios.config.js';
import { showToast } from '../helper/toast.helper';
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      arrowBack,
      openActionSheet: false,
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        document: '',
        age: 0,
      }
    };
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return showToast('Invalid email');
      }

      this.inputEmail(email);
    },
    handleInput(key, value) {
      this.user[key] = value;
    },
    goBack() {
      this.$router.go(-1);
    },
    async register() {
      try {
        const body = {
          ...this.user,
        };

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

<style scoped lang="scss">
.action-sheet-wrapper {
  position: fixed;
}

.action-sheet-container {
  max-height: 300px;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__header {
    width: 100%;
    position: fixed;
    top: 0;
    border-bottom: 8px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 1px 4px 2px grey;

    &__title {
      font-family: 'Sora'; 
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    &__back-button {
      --background: none;
      --box-shadow: none;
      --border-radius: 50%;
      --color: var(--ion-text-base-color);
    }
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

    &__select {
      --border-color: var(--ion-background-color-800) !important;
      --border-radius: 4px !important;
      --border-width: 2px !important;
      min-height: 40px;
    }

    &__button-confirm {
      height: 40px;
      width: 100%;
      --background: var(--ion-background-color-800);
      --color: var(--ion-dark-text-color);
      --border-radius: 4px;
    }
  }
}

ion-select::part(placeholder) {
  font-size: 14px;
  font-weight: 500;
}
</style>