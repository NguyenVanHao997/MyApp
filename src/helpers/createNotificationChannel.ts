import notifee from '@notifee/react-native';

async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}

export default createNotificationChannel;
