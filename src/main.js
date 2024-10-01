import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { 
  // Core components
  IonicVue, 
  IonPage,
  IonApp,
  IonContent,
  IonIcon,
  IonSearchbar,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonTitle,
  IonBackButton,
  
  // Item components
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonListHeader,
  IonLabel,

  // Tabs components
  IonTab,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  
  // Form components
  IonButtons,
  IonButton,
  IonInput,
  IonInputPasswordToggle,
  
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

const components = {
  IonPage,
  IonTitle,
  IonButtons,
  IonInput,
  IonInputPasswordToggle,
  IonLabel,
  IonList,
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonBackButton,
  IonTabs,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonApp,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonListHeader,
  IonSearchbar,
};

Object.entries(components).forEach(([name, component]) => {
  app.component(name, component);
});

// Grid components
app.component('IonRow', IonRow);
app.component('IonCol', IonCol);
app.component('IonGrid', IonGrid);

router.isReady().then(() => {
  app.mount('#app');
});
