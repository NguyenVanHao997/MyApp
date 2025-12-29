// notificationHandler.ts
import notifee, {
  EventType,
  Event,
  Notification,
  NotificationPressAction,
} from '@notifee/react-native';
import {Linking} from 'react-native';

export const handleNotificationPress = async (
  notification: Notification,
  _pressAction: NotificationPressAction,
) => {
  const deepLink = notification?.data?.deepLink;

  if (typeof deepLink === 'string') {
    try {
      const supported = await Linking.canOpenURL(deepLink);
      console.log('🟢 Deep link received:', deepLink);
      console.log('✅ Can open URL:', supported);

      if (supported) {
        await Linking.openURL(deepLink);
      } else {
        console.warn('❌ Deep link not supported:', deepLink);
      }
    } catch (e) {
      console.warn('❌ Failed to open deep link:', deepLink, e);
    }
  } else {
    console.warn('❌ No valid deepLink found in notification data');
  }
};

export const registerBackgroundNotificationHandler = () => {
  notifee.onBackgroundEvent(async (event: Event) => {
    const {type, detail} = event;

    if (type === EventType.PRESS && detail.notification && detail.pressAction) {
      handleNotificationPress(detail.notification, detail.pressAction);
    }
  });
};

// Dùng khi app được mở lại từ trạng thái bị kill
export const checkInitialNotification = async () => {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log('🟢 App mở từ noti (kill state)');
    const {notification, pressAction} = initialNotification;
    handleNotificationPress(notification, pressAction);
  }
};
export const registerForegroundNotificationHandler = () => {
  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS && detail.notification && detail.pressAction) {
      handleNotificationPress(detail.notification, detail.pressAction);
    }
  });
};
