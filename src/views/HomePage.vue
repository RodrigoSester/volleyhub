<template>
  <ion-page style="margin: 16px 16px 0px 16px;">
    <ion-content>
      <ion-title style="margin-bottom: 24px">
        Olá, {{ user.name }}!
      </ion-title>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Próximas partidas
          </ion-card-title>
          <ion-card-subtitle>
            Confira as próximas partidas
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>
                <h2>Partida 1</h2>
                <p>Local: Quadra 1</p>
                <p>Data: 01/01/2022</p>
              </ion-label>
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