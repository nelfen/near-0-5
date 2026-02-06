export type NotificationItem = {
  createdAt: string;
  id: number;
  kind: NotificationKind;
  message: string;
  sessionId: number;
  title: string;
};

export type NotificationKind = 'START';
