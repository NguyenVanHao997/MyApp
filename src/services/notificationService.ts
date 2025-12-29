// notificationService.ts
import notifee, {AndroidImportance} from '@notifee/react-native';

export const handleIncomingMessage = async (remoteMessage: any) => {
  try {
    const {title = 'Tin nhắn mới', body = ''} = remoteMessage.data || {};

    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title,
      body,
      data: remoteMessage.data ?? {},
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (err) {
    console.error('❌ Error displaying notification:', err);
  }
};
