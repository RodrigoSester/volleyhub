<template>
  <ion-page class="ion-no-padding">
    <ion-content :fullscreen="true">
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

        <ion-grid class="register__form" style="margin-top: 70px;">
          <ion-row class="ion-justify-content-start">
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Nome:*
              </ion-label>
              <ion-input
                ref="inputName"
                style="margin-top: 4px"
                type="email"
                fill="outline"
                class="register__form__input"
                error-text="Nome inválido"
                placeholder="John Doe"
                required
                @ionBlur="markTouched('inputName')"
                @input="handleInput('name', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                E-mail:*
              </ion-label>
              <ion-input
                ref="inputEmail"
                style="margin-top: 4px"
                type="email"
                placeholder="example@email.com"
                fill="outline"
                class="register__form__input"
                error-text="E-mail inválido"
                required
                @ionBlur="markTouched('inputEmail')"
                @input="handleInput('email', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Número:*
              </ion-label>
              <ion-input
                ref="inputPhone"
                style="margin-top: 4px"
                type="tel"
                placeholder="(99) 99999-9999"
                error-text="Número inválido"
                fill="outline"
                class="register__form__input"
                required
                @input="handleInput('phone', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Documento:*
              </ion-label>
              <ion-input
                ref="inputDocument"
                style="margin-top: 4px"
                placeholder="000.000.000-00"
                error-text="Documento inválido"
                fill="outline"
                class="register__form__input"
                required
                maxlength="11"
                @input="handleInput('document', $event.target.value)"
              />
            </ion-col>
            <ion-col size="4" class="ion-no-padding ion-margin-bottom">
              <ion-label class="register__form__label">
                Idade:*
              </ion-label>
              <ion-select
                v-model="user.age"
                ref="inputAge"
                interface="popover"
                placeholder="Idade"
                error-text="Selecione uma idade"
                fill="outline"
                required
                @ionBlur="markTouched('inputAge')"
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
                Senha:*
              </ion-label>
              <ion-input
                ref="inputPassword"
                style="margin-top: 4px"
                type="password"
                fill="outline"
                class="register__form__input"
                placeholder="Sua senha"
                required
                @input="handleInput('password', $event.target.value)"
              />
              <div class="register__form__password-requirements">
                <p :class="{'register__form__password-requirements__valid': hasUpperCase, 'register__form__password-requirements__invalid': !hasUpperCase}">• Uma letra maiúscula</p>
                <p :class="{'register__form__password-requirements__valid': hasNumber, 'register__form__password-requirements__invalid': !hasNumber}">• Um número</p>
                <p :class="{'register__form__password-requirements__valid': hasSymbol, 'register__form__password-requirements__invalid': !hasSymbol}">• Um símbolo (!@#$%^&*)</p>
                <p :class="{'register__form__password-requirements__valid': hasMinLength, 'register__form__password-requirements__invalid': !hasMinLength}">• Mínimo 6 caracteres</p>
              </div>
              <ion-label class="register__form__label" style="margin-top: 10px">
                Confirmar Senha:*
              </ion-label>
              <ion-input
                ref="inputConfirmPassword"
                style="margin-top: 4px"
                type="password"
                fill="outline"
                class="register__form__input"
                placeholder="Repita sua senha"
                error-text="As senhas não coincidem"
                required
                @ionBlur="markTouched('inputConfirmPassword')"
                @input="handleInput('confirmPassword', $event.target.value)"
              />
            </ion-col>
            <ion-col size="12" class="ion-no-padding">
              <ion-button class="ion-no-margin register__form__button-confirm" type="submit" @click="register()">
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
import { showErrorToast, showSuccessToast } from '../helper/toast.helper';
import { arrowBack } from 'ionicons/icons';
import { debounce } from 'lodash';

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
        confirmPassword: '',
        phone: '',
        document: '',
        age: 0,
      }
    }
  },
  computed: {
    hasUpperCase() {
      return /[A-Z]/.test(this.user.password);
    },
    hasNumber() {
      return /\d/.test(this.user.password);
    },
    hasSymbol() {
      return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.user.password);
    },
    hasMinLength() {
      return this.user.password.length >= 6;
    },
    passwordMismatch() {
      return this.user.password !== this.user.confirmPassword;
    },
    hasValidPassword() {
      return this.hasUpperCase && this.hasNumber && this.hasSymbol && this.hasMinLength;
    }
  },
  methods: {
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

    validatePassword: debounce((context) => {
      if (!context.hasValidPassword) {
        return context.$refs.inputPassword.$el.classList.add('ion-invalid');
      }

      context.$refs.inputPassword.$el.classList.remove('ion-invalid');
    }, 1000),

    validateConfirmPassword: debounce((context) => {
      if (context.passwordMismatch) {
        return context.$refs.inputConfirmPassword.$el.classList.add('ion-invalid');
      }

      context.$refs.inputConfirmPassword.$el.classList.remove('ion-invalid');
    }, 1000),

    handleInput(key, value) {
      this.$refs[`input${this.getUserPropertyInputKey(key)}`].$el.classList.remove('ion-invalid');

      let numberValue;
      switch (key) {
        case 'email':
          this.validateEmail(this, value);
          break;
        case 'confirmPassword':
          this.user.confirmPassword = value;
          this.validateConfirmPassword(this, value);
          break;
        case 'password':
          this.validatePassword(this);
          break;
        case 'phone':
          numberValue = value.replace(/\D+/g, '');
          this.$refs.inputPhone.$el.value = value.replace(/\D+/g, '');
          break;
        case 'document':
          numberValue = value.replace(/\D+/g, '');
          this.$refs.inputDocument.$el.value = value.replace(/\D+/g, '');
          break;
        default:
          break;
      }

      if (numberValue) {
        this.user[key] = numberValue;
        return;
      }

      this.user[key] = value;
    },
    goBack() {
      this.$router.go(-1);
    },
    validateForm() {
      for (const userProperty in this.user) {
        if (!this.user[userProperty]) {
          this.markTouched(`input${this.getUserPropertyInputKey(userProperty)}`);
          this.$refs[`input${this.getUserPropertyInputKey(userProperty)}`].$el.classList.add('ion-invalid');
        }
      }

      return (
        this.user.name &&
        this.user.email &&
        this.user.password &&
        this.user.confirmPassword &&
        this.user.phone &&
        this.user.document &&
        this.user.age &&
        this.hasValidPassword
      );
    },
    async register() {
      if (!this.validateForm()) {
        return showErrorToast('Há erros no preenchimento. Revise os campos e tente novamente.');
      }

      try {
        const body = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone,
          document: this.user.document,
          age: this.user.age,
        };

        const response = await axiosInstance.post('/auth/register', body);

        showSuccessToast('Conta criada com sucesso!');
        setToken(response.data.body);
        this.$router.push('/home');
      } catch (error) {
        showErrorToast(error.message);
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
    max-height: 100%;
    overflow-y: auto;

    &__label {
      font-family: 'Sora';
      font-weight: 700;
    }

    &__button-confirm {
      height: 40px;
      width: 100%;
      --background: var(--ion-background-color-800);
      --color: var(--ion-dark-text-color);
      --border-radius: 4px;
    }

    &__password-requirements {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 700;
      color: var(--ion-text-color-600);

      &__valid {
        color: var(--ion-success-color);
      }

      &__invalid {
        color: var(--ion-danger-color);
      }
    }
  }
}

ion-select::part(placeholder) {
  font-size: 14px;
  font-weight: 500;
}
</style>