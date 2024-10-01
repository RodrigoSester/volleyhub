<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-label>
              Email
            </ion-label>
            <ion-input
              type="email"
              placeholder="example@email.com"
              fill="outline"
              required
            />
          </ion-col>
          <ion-col size="12">
            <ion-label>
              Password
            </ion-label>
            <ion-input
              type="password"
              fill="outline"
              required
            />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button
              expand="block"
              fill="solid"
              color="primary"
              routerLink="/home"
            >
              Login
            </ion-button>
            <ion-button
              expand="block"
              fill="outline"
              color="secondary"
              routerLink="/register"
            >
              <ion-label>
                Criar Conta
              </ion-label>
            </ion-button>
            <ion-label>
              <a href="/src/views/FolderPage.vue">Esqueceu a senha?</a>
            </ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>

</script>

<style scoped>
</style>
