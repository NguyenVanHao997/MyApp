import {Alert, Linking} from 'react-native';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

export const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log('✅ Notification permission granted');
    return true;
  }

  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    Alert.alert(
      'Bạn đã từ chối quyền thông báo',
      'Vui lòng vào Cài đặt để bật lại quyền thông báo.',
      [
        {
          text: 'Mở Cài đặt',
          onPress: () => Linking.openSettings(),
        },
        {text: 'Đóng', style: 'cancel'},
      ],
    );
  }

  return false;
};
