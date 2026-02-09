import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/api';

import { updateNotificationSettings } from '../api/updateNotificationSettings';

const NOTIFICATION_SETTINGS_QUERY_KEY = ['notifications', 'settings'] as const;

export type NotificationSettings = {
  artist: boolean;
  live: boolean;
  marketing: boolean;
};

type NotificationSettingsResponse = {
  artist_noti: boolean;
  live_noti: boolean;
  marketing_noti: boolean;
};

export function useNotificationSettings() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryFn: async (): Promise<NotificationSettings> => {
      const { data } = await api.get<NotificationSettingsResponse>(
        '/notifications/settings',
      );

      return {
        artist: data.artist_noti,
        live: data.live_noti,
        marketing: data.marketing_noti,
      };
    },
    queryKey: NOTIFICATION_SETTINGS_QUERY_KEY,
  });

  const updateMutation = useMutation({
    mutationFn: (settings: NotificationSettings) =>
      updateNotificationSettings({
        live_start_notification: settings.live,
        marketing_consent: settings.marketing,
        new_content_from_favorite_artists: settings.artist,
      }),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(NOTIFICATION_SETTINGS_QUERY_KEY, variables);
    },
  });

  return {
    isLoading: settingsQuery.isLoading,
    isUpdating: updateMutation.isPending,
    settings: settingsQuery.data,
    updateSettings: updateMutation.mutate,
  };
}
