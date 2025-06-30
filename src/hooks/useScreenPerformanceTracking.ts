// hooks/useScreenPerformanceTracking.ts
import {useEffect, useState} from 'react';
import * as Sentry from '@sentry/react-native';

type UseScreenPerformanceTrackingProps = {
  screenName: string;
  extraData?: Record<string, any>;
  onLoad?: () => Promise<void>;
};

export function useScreenPerformanceTracking({
  screenName,
  extraData = {},
  onLoad,
}: UseScreenPerformanceTrackingProps) {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = Date.now();

    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Started loading screen: ${screenName}`,
      level: 'info',
    });

    const runOnLoad = async () => {
      if (onLoad) {
        try {
          await onLoad();
        } catch (err) {
          Sentry.captureException(err);
          Sentry.addBreadcrumb({
            category: 'error',
            message: `Error loading screen ${screenName}`,
            level: 'error',
          });
        }
      }

      const duration = Date.now() - startTime;
      setLoadTime(duration);

      Sentry.addBreadcrumb({
        category: 'performance',
        message: `${screenName} loaded in ${duration}ms`,
        level: 'info',
      });

      Sentry.captureMessage(`${screenName} loaded in ${duration}ms`);
      Sentry.setContext('screen_performance', {
        screen: screenName,
        duration_ms: duration,
        ...extraData,
      });
    };

    runOnLoad();
  }, [extraData, onLoad, screenName]);

  return loadTime; // Trả về thời gian load
}
