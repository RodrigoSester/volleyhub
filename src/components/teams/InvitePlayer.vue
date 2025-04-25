<template>
  <ion-modal :is-open="open" class="invite-player">
    <ion-content class="invite-player__content">
      <ion-toolbar class="invite-player__content__toolbar">
        <ion-title>
          Link gerado!
        </ion-title>
      </ion-toolbar>
      <div class="ion-padding">
        <ion-button expand="full" fill="outline" color="primary" class="ion-margin-top" @click="copyLink">
          Copiar link
        </ion-button>

        <span class="invite-player__content__subheader">
          O link expirará em 24 horas.
        </span>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    teamId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    copyLink() {
      const timestamp = Math.floor(Date.now() / 1000);
      const link = `https://volleyhub.com/teams/invite?expiration=${timestamp}&teamId=${this.teamId}`;

      navigator.clipboard.writeText(link).then(() => {
        console.log('Link copied to clipboard: ', link);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.invite-player {
  top: 25%;
  height: 30%;
  margin: 24px;
  border-radius: 16px !important;
  border: 4px solid var(--ion-background-header) !important;
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);

  &__content {
    &__toolbar {
      border-radius: 16px !important;
    }

    &__subheader {
      font-size: 14px;
      font-weight: 400;
      color: var(--ion-text-color-400) !important;
    }
  }
}
</style>