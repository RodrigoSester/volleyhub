<template>
  <ion-page class="home">
    <ion-content class="custom-scrollbar">
      <ion-title class="home__title ion-no-padding ion-margin-bottom">
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
            <ion-list lines="full" class="ion-no-padding home__card__content__list">
              <ion-item
                v-for="match in matches.slice(0, 3)"
                :key="match.id"
                class="home__card__content__list__item ion-align-items-center ion-justify-content-between"
              >
                <div>
                  <span>
                    {{ match.title }}
                  </span>
                  <ion-label class="subtitle">
                    {{ match.subtitle }}
                  </ion-label>
                </div>
                <ion-note slot="end">
                  <ion-chip :class="statusChipClass(match.status)">{{ match.status }}</ion-chip>
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
import { axiosInstance } from '../config/axios.config';
import { ref } from 'vue';
import { showToast } from '../helper/toast.helper';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      user: {
        name: 'Rodrigo',
      },
    };
  },
  mounted() {
    this.fetchUserMatches();
  },
  setup() {
    const matches = ref([]);
    const loading = ref(false);

    const fetchUserMatches = async () => {
      loading.value = true;
      try {
        const response = await axiosInstance.get('/user/matches');
        matches.value = response.data.body || response.data;
      } catch (error) {
        showToast('Erro ao buscar partidas');
        console.error('Error fetching matches:', error);
      } finally {
        loading.value = false;
      }
    };

    const statusChipClass = (status) => {
      switch (status) {
      case 'confirmed':
        return 'success';
      case 'canceled':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'refused':
        return 'danger';
      default:
        return 'warning';
      }
    };

    return {
      matches,
      loading,
      fetchUserMatches,
      statusChipClass,
    };
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