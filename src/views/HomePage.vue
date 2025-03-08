<template>
  <ion-page class="home" style="padding: 16px 16px 0px 16px;">
    <ion-content>
      <ion-title class="home__title" style="margin-bottom: 24px">
        Olá, {{ user.name }}!
      </ion-title>
      <div>
        <span class="home__card__title">
          Próximas partidas
        </span>
        <ion-card class="ion-no-margin home__card">
          <ion-card-header class="ion-no-padding">
            <ion-row class="ion-padding-horizontal home__card__header">
              <span>
                Título
              </span>
              <span>
                Presença
              </span>
            </ion-row>
          </ion-card-header>
          <ion-card-content class="home__card__content">
            <ion-list class="ion-no-padding home__card__content__list">
              <ion-item class="home__card__content__list">
                <ion-label>
                  Amistoso Gamma
                </ion-label>
                <span>
                  Masculino • 25/01
                </span>
              </ion-item>
              <ion-item>
                <ion-label>
                  <h2>Partida 2</h2>
                  <p>Local: Quadra 2</p>
                  <p>Data: 02/01/2022</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Notificação
          </ion-card-title>
          <ion-card-subtitle>
            Confira as notificações
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>
                <h2>Notificação 1</h2>
                <p>Descrição da notificação 1</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2>Notificação 2</h2>
                <p>Descrição da notificação 2</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Lembretes
          </ion-card-title>
          <ion-card-subtitle>
            Confira os lembretes
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>
                <h2>Lembrete 1</h2>
                <p>Descrição do lembrete 1</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2>Lembrete 2</h2>
                <p>Descrição do lembrete 2</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      user: {
        name: 'John Doe',
      },
    }
  },
  methods: {
    openMenu() {
      console.log('Open menu');
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  &__title {
    font-family: 'Sora';
    font-size: 36px;
    font-weight: 700;
  }
  
  &__card {
    border-radius: 4px;
    border: 1px solid var(--ion-background-color-600) !important;

    &__title {
      font-family: 'Sora';
      font-size: 14px;
      font-weight: 700;
      color: var(--ion-text-color-600) !important;
    }
  
    &__header {
      background-color: var(--ion-background-color-600);
      min-height: 60px;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }

    &__content {
      background: var(--ion-background-color-400) !important;

      &__list {
        background-color: var(--ion-background-color-400) !important;
        mix-blend-mode: color;
      }
    }
  }
}
</style>