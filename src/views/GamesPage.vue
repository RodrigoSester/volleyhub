<template>
  <ion-page class="games-page">
    <ion-header class="games-page__header">
      <ion-toolbar class="games-page__header__toolbar">
        <ion-title class="games-page__header__title">Jogos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
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
                {{ match.modality }} • {{ formatDate(match.date) }}
              </ion-label>
            </div>
          </ion-label>
          <ion-note slot="end">
            <ion-chip :class="presenceClass(match.presence)">
              {{ match.presence }}
            </ion-chip>
          </ion-note>
          <ion-button slot="end" fill="clear" class="games-page__list__item__button" @click="openActions(match)">
            <ion-icon name="ellipsis-vertical" />
          </ion-button>
        </ion-item>
      </ion-list>
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
import { axiosInstance } from '../config/axios.config';
import { showToast } from '../helper/toast.helper';

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

    const openActions = (match) => {
      selectedMatch.value = match;
      actionSheetOpen.value = true;
    };

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

    const presenceClass = (presence) => {
      switch (presence) {
        case 'Accepted':
          return 'success';
        case 'Refused':
          return 'danger';
        default:
          return 'warning';
      }
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleString();
    };

    return {
      matches,
      loading,
      actionSheetOpen,
      selectedMatch,
      openActions,
      actionSheetButtons,
      presenceClass,
      formatDate,
      fetchUserMatches,
    };
  },
});
</script>

<style scoped lang="scss">
.games-page {
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
}
</style>