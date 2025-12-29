import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';

const collectSystemInfo = async () => {
  const totalMemory = await DeviceInfo.getTotalMemory(); // in bytes
  const freeDisk = await DeviceInfo.getFreeDiskStorage();
  const usedMemory = await DeviceInfo.getUsedMemory();

  Sentry.setContext('device_metrics', {
    platform: Platform.OS,
    totalMemory,
    usedMemory,
    freeDisk,
  });
};
export default collectSystemInfo;
