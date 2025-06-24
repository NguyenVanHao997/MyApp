import messaging, {
  getMessaging,
  getToken,
  onMessage,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
  requestPermission,
} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';

import {Alert} from 'react-native';

/**
 * Yêu cầu quyền và lấy FCM token
 */
export const setupFCM = async (): Promise<string | null> => {
  try {
    const app = getApp();
    const messagingInstance = getMessaging(app);

    const authStatus = await requestPermission(messagingInstance);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('🔒 Notification permission not granted');
      return null;
    }

    const isRegistered = isDeviceRegisteredForRemoteMessages(messagingInstance);
    if (!isRegistered) {
      await registerDeviceForRemoteMessages(messagingInstance);
    }

    // Lấy FCM token
    const fcmToken = await getToken(messagingInstance);
    console.log('📲 FCM Token:', fcmToken);

    return fcmToken;
  } catch (error) {
    console.error('❌ Error setting up FCM:', error);
    return null;
  }
};

/**
 * Xử lý thông báo khi app đang mở
 */
export const listenToForegroundNotifications = () => {
  const app = getApp();
  const messagingInstance = getMessaging(app);

  const unsubscribe = onMessage(messagingInstance, async remoteMessage => {
    console.log('📬 Foreground FCM Message:', remoteMessage);

    // Hiển thị Alert hoặc hiển thị popup tùy ý
    Alert.alert(
      remoteMessage.notification?.title || 'Thông báo',
      remoteMessage.notification?.body || '',
    );
  });

  return unsubscribe;
};
