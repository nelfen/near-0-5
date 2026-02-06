import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotification } from '../api/notification.api';
import { notificationQueryKeys } from '../notificationQueryKeys.ts';
export function useDeleteNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });
}
