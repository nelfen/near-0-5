import { api } from '@/api/api';

export type UpdateNotificationSettingsPayload = {
  live_start_notification: boolean;
  marketing_consent: boolean;
  new_content_from_favorite_artists: boolean;
};

export async function updateNotificationSettings(
  payload: UpdateNotificationSettingsPayload,
) {
  const { data } = await api.patch('/notifications/settings', payload);

  return data;
}
