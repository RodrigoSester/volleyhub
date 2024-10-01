import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { 
  IonicVue, 
  IonPage,
  IonTitle,
  IonButtons,
  IonInput,
  IonInputPasswordToggle,
  IonLabel,
  IonList,
  IonContent,
  IonButton,

  // Grid components
  IonRow,
  IonCol,
  IonGrid,
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.component('IonPage', IonPage);
app.component('IonTitle', IonTitle);
app.component('IonButtons', IonButtons);
app.component('IonInput', IonInput);
app.component('IonInputPasswordToggle', IonInputPasswordToggle);
app.component('IonLabel', IonLabel);
app.component('IonList', IonList);
app.component('IonContent', IonContent);
app.component('IonButton', IonButton);

// Grid components
app.component('IonRow', IonRow);
app.component('IonCol', IonCol);
app.component('IonGrid', IonGrid);

router.isReady().then(() => {
  app.mount('#app');
});
