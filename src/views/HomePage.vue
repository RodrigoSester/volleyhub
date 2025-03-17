<template>
  <ion-page class="home">
    <ion-content class="custom-scrollbar">
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
          <ion-card-content class="home__card__content ion-no-padding">
            <ion-list class="ion-no-padding home__card__content__list">
              <ion-item class="home__card__content__list__item ion-align-items-center ion-justify-content-between">
                <div>
                  <span>
                    Amistoso Gamma
                  </span>
                  <ion-label class="subtitle">
                    Masculino • 25/01
                  </ion-label>
                </div>
                <ion-note slot="end">
                  <ion-chip class="warning">Pendente</ion-chip>
                </ion-note>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
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
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--ion-text-color-400) var(--ion-color-primary) !important;
  
  &::-webkit-scrollbar-corner {
    background-color: var(--ion-text-color-400);
    position: absolute;
    right: 0;
  }

  &::-webkit-scrollbar {
    position: absolute;
    right: 0;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    position: absolute;
    right: 0;
    background: var(--ion-text-color-400) !important;
  }

  &::-webkit-scrollbar-thumb {
    position: absolute;
    right: 0;
    background: var(--ion-text-color-400) !important;
  }
}

.home {
  padding: 24px 24px 0px 24px !important;

  &__title {
    font-family: 'Sora';
    font-size: 36px;
    font-weight: 700;
  }
  
  &__card {
    border-radius: 8px;
    border: 3px solid var(--ion-background-color-600) !important;

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
      }
    }
  }
}
</style>