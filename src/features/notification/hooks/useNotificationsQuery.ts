import { useQuery } from '@tanstack/react-query';

import { getNotifications } from '../api/notification.api';
import { notificationQueryKeys } from '../notificationQueryKeys.ts';

export function useNotificationsQuery() {
  return useQuery({
    queryFn: getNotifications,
    queryKey: notificationQueryKeys.all,
  });
}
