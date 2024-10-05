<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title>Adicionar time</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <ion-label position="floating">Título:</ion-label>
                <ion-input
                  style="margin-top: 4px"
                  placeholder="Título do time"
                  fill="outline"
                  required
                  @input="inputTeamValue($event.target.value, 'name')"
                />
              </ion-col>
              <ion-col size="12">
                <ion-label position="floating">Abreviação:</ion-label>
                <ion-input
                  style="margin-top: 4px"
                  placeholder="Abreviação do time"
                  fill="outline"
                  required
                  @input="inputTeamValue($event.target.value, 'abbreviation')"
                />
              </ion-col>
              <ion-col size="12">
                <!-- usar select -->
                <ion-label position="floating">Modalidade:</ion-label>
                <ion-input></ion-input>
              </ion-col>
              <ion-col size="12">
                <ion-label>Link de imagem da sua bandeira:</ion-label>
                <ion-input
                  style="margin-top: 4px"
                  placeholder="Link da imagem"
                  fill="outline"
                  required
                  @input="inputTeamValue($event.target.value, 'flag_url')"
                />
              </ion-col>
              <ion-col size="12">
                <ion-label>Mensalidade:</ion-label>
                <ion-input
                  style="margin-top: 4px"
                  placeholder="R$ 0,00"
                  fill="outline"
                  required
                  @input="inputTeamValue($event.target.value, 'monthly_fee')"
                />
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-button expand="block">Adicionar</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { axiosInstance } from '../../config/axios.config';
import { showToast } from '../../helper/toast.helper';

export default defineComponent({
  name: 'ModalRegisterTeam',
  data() {
    return {
      isOpen: false,
      team: {
        name: '',
        abbreviation: '',
        modality: '',
        flag_url: '',
        monthly_fee: 0,
      },
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    cancel() {
      this.close();
    },
    inputTeamValue(value, key) {
      this.team[key] = value;
    },
    async registerTeam() {
      this.loading = true;

      try {
        const body = {
          ...this.team,
        };

        const response = await axiosInstance.post('/teams', body);

        console.log(response.data);
        this.close();
      } catch (error) {
        console.error(error);
        showToast('Erro ao adicionar time');
      }
    }
  },
});
</script>