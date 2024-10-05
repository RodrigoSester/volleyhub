<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="close()">Cancel</ion-button>
        </ion-buttons>
        <ion-title>{{ team.id ? "Editar time" : "Adicionar time" }}</ion-title>
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
                  v-model="team.name"
                  style="margin-top: 4px"
                  placeholder="Título do time"
                  fill="outline"
                  required
                />
              </ion-col>
              <ion-col size="12">
                <ion-label position="floating">Abreviação:</ion-label>
                <ion-input
                  v-model="team.abbreviation"
                  style="margin-top: 4px"
                  placeholder="Abreviação do time"
                  fill="outline"
                  required
                />
              </ion-col>
              <ion-col size="12">
                <ion-label position="floating">Modalidade:</ion-label>
                <ion-select 
                  v-model="team.modality"
                  justify="space-between"
                  fill="outline"
                  interface="popover"
                  aria-label="Modalidade"
                  placeholder="Modalidade"
                >
                  <ion-select-option value="male">Masculino</ion-select-option>
                  <ion-select-option value="female">Feminino</ion-select-option>
                  <ion-select-option value="mixed">Misto</ion-select-option>
                </ion-select>
              </ion-col>
              <ion-col size="12">
                <ion-label>Link de imagem da sua bandeira:</ion-label>
                <ion-input
                  v-model="team.flag_url"
                  style="margin-top: 4px"
                  placeholder="Link da imagem"
                  fill="outline"
                  required
                />
              </ion-col>
              <ion-col size="12">
                <ion-label>Mensalidade:</ion-label>
                <ion-input
                  v-model="team.monthly_fee"
                  style="margin-top: 4px"
                  placeholder="R$ 0,00"
                  fill="outline"
                  required
                />
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-button expand="block" @click="registerTeam()">Adicionar</ion-button>
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
  props: {
    dataTeam: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isOpen: false,
      team: {
        id: null,
        name: '',
        abbreviation: '',
        modality: '',
        flag_url: '',
        monthly_fee: 0,
      },
    };
  },
  watch: {
    dataTeam(value) {
      const data = JSON.parse(JSON.stringify(value));

      if (data) {
        this.team = {
          id: data.id,
          name: data.name,
          abbreviation: data.abbreviation,
          modality: data.modality,
          flag_url: data.flag_url,
          monthly_fee: data.monthly_fee,
        };
      }
    }
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.resetForm();
      this.isOpen = false;
    },
    resetForm() {
      this.team = {
        id: null,
        name: '',
        abbreviation: '',
        modality: '',
        flag_url: '',
        monthly_fee: 0,
      };
    },
    async handleSave() {
      this.loading = true;

      try {
        const body = {
          ...this.team,
        };

        if (this.team.id) {
          await axiosInstance.put(`/teams/${this.team.id}`, body);
        } else {
          await axiosInstance.post('/teams', body);
        }

        this.close();
      } catch (error) {
        console.error(error);
        showToast('Erro ao adicionar time');
      } finally {
        this.loading = false;
      }
    }
  },
});
</script>