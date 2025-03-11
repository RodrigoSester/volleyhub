
import { toastController } from "@ionic/vue";

const _showToast = async ({ header = '', color = '', message, position = 'bottom', duration = 2000 }) => {
  const toast = await toastController.create({
    header,
    message,
    duration,
    position,
    color,
    animated: true,
  });
 
  toast.present();
};

export const showToast = async (message, position = 'bottom', duration = 2000) => {
  await _showToast({ message, position, duration });
}

export const showErrorToast = async (message) => {
  await _showToast({ header: 'Error:', message, position: 'bottom', color: 'danger' });
};

export const showSuccessToast = async (message) => {
  await _showToast({ message, position: 'bottom', color: 'success' });
}
