<template>
  <ion-page class="games-page">
    <ion-header class="games-page__header">
      <ion-toolbar class="games-page__header__toolbar">
        <ion-title class="games-page__header__title">Jogos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content refreshing-spinner="bubbles" class="games-page__refresher" />
      </ion-refresher>

      <ion-grid v-if="loading" style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <ion-spinner style="height: 64px; width: 64px;" />
      </ion-grid>
      <div v-else-if="matches.length > 0 && !loading">
        <ion-list class="games-page__list" lines="full">
          <ion-item class="games-page__list__header">
            <ion-label class="games-page__list__header__label">
              Partida
            </ion-label>
            <ion-label class="games-page__list__header__label" slot="end">
              Status
            </ion-label>
          </ion-item>
          <ion-item class="games-page__list__item" v-for="match in matches" :key="match.id">
            <ion-label>
              <div class="games-page__list__item__match">
                <span>{{ match.title }}</span>
                <ion-label class="subtitle">
                  {{ formatModality(match.modality) }} • {{ formatDate(match.date) }}
                </ion-label>
              </div>
            </ion-label>
            <ion-note slot="end">
              <ion-chip :class="formatStatusClass(match.status)">
                {{ formatStatusLabel(match.status) }}
              </ion-chip>
            </ion-note>
          </ion-item>
        </ion-list>
      </div>
      <ion-card v-else class="games-page__empty-card">
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-icon :icon="alertCircleOutline" style="font-size: 64px;" class="games-page__empty-card__title" />
              <ion-label>
                <ion-card-title class="games-page__empty-card__title">
                  Ainda não há jogos!
                </ion-card-title>
                <ion-card-subtitle style="margin-top: 4px;" class="games-page__empty-card__subtitle">
                  Seus próximos jogos aparecerão aqui
                </ion-card-subtitle>
              </ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <ion-action-sheet
        :is-open="actionSheetOpen"
        :header="selectedMatch?.title"
        :buttons="actionSheetButtons"
        @didDismiss="actionSheetOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { alertCircleOutline } from 'ionicons/icons';
import { axiosInstance } from '../config/axios.config';
import { showToast } from '../helper/toast.helper';
import { formatDate, formatStatusClass, formatStatusLabel, formatModality } from '../plugin';

export default defineComponent({
  name: 'GamesPage',
  setup() {
    const matches = ref([]);
    const loading = ref(false);
    const actionSheetOpen = ref(false);
    const selectedMatch = ref(null);

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

    onMounted(() => {
      fetchUserMatches();
    });

    const acceptMatch = () => {
      if (selectedMatch.value) {
        selectedMatch.value.presence = 'Accepted';
      }
      actionSheetOpen.value = false;
    };

    const refuseMatch = () => {
      if (selectedMatch.value) {
        selectedMatch.value.presence = 'Refused';
      }
      actionSheetOpen.value = false;
    };

    const actionSheetButtons = [
      {
        text: 'Accept',
        handler: acceptMatch,
      },
      {
        text: 'Refuse',
        role: 'destructive',
        handler: refuseMatch,
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ];

    const handleRefresh = async (event) => {
      await fetchUserMatches();
      
      if (event) {
        event.detail.complete();
      }
    };

    return {
      matches,
      loading,
      actionSheetOpen,
      selectedMatch,
      actionSheetButtons,
      formatStatusClass,
      formatStatusLabel,
      formatDate,
      formatModality,
      fetchUserMatches,
      handleRefresh,
      alertCircleOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.games-page {
  &__refresher {
    color: var(--ion-background-color-800) !important;
  }

  &__header {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    &__toolbar {
      --background: var(--ion-background-color);
      --color: var(--ion-color-light);
      height: 80px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      display: flex;
    }

    &__title {
      font-family: 'Sora';
      font-size: 24px;
      font-weight: bold;
      color: var(--ion-text-color);
    }
  }

  &__list {
    background: none;
    padding: 0;

    &__header {
      --background: var(--ion-background-header);

      &__label {
        color: var(--ion-text-color-600) !important;
        font-weight: 700;
      }
    }

    &__item {
      --background: var(--ion-background-item-list);
      --color: var(--ion-text-color);
      font-weight: 700;

      &__match {
        display: flex;
        flex-direction: column;
        
        span {
          font-weight: 700;
        }
        
        .subtitle {
          color: var(--ion-text-color-600);
          font-size: 14px;
          font-weight: 400;
        }
      }

      &__button {
        color: var(--ion-text-color);
      }
    }
  }

  &__empty-card {
    --background: var(--ion-background-item-list);
    border: 2px solid var(--ion-background-color-800);
    border-radius: 8px;
    height: 200px;
    align-content: center;

    &__title {
      color: var(--ion-text-color);
      font-size: 24px;
      font-weight: 700;
    }

    &__subtitle {
      color: var(--ion-text-color-600);
      font-weight: 700;
      font-size: 14px;
    }
  }
}
</style>