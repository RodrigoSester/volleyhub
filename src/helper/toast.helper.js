
import { toastController } from "@ionic/vue";

export const showToast = async (message, position = 'bottom', duration = 2000) => {
  const toast = await toastController.create({
    message,
    duration,
    position,
  });
 
  toast.present();
}