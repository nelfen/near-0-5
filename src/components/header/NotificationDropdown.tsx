import { BellIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components';
import {
  useDeleteNotificationMutation,
  useNotificationsQuery,
} from '@/features/notification/hooks';
import { cn } from '@/utils';

import { notificationWrapperVariants } from './header.styles';

export default function NotificationDropdown() {
  const navigate = useNavigate();

  const {
    data: notifications = [],
    isError,
    isLoading,
  } = useNotificationsQuery();

  const { mutate: deleteNotification } = useDeleteNotificationMutation();

  const unreadCount = notifications.length;

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className={cn(notificationWrapperVariants())}>
          <Button size="icon" variant="ghost">
            <BellIcon />
          </Button>

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#E7000B] text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownTrigger>

      <DropdownContent align="end" className="w-80">
        {isLoading && (
          <div className="px-3 py-4 text-sm text-gray-500">
            알림을 불러오는 중입니다.
          </div>
        )}

        {isError && (
          <div className="px-3 py-4 text-sm text-red-500">
            알림을 불러오지 못했습니다.
          </div>
        )}

        {!isLoading && !isError && unreadCount === 0 && (
          <div className="px-3 py-4 text-sm text-gray-500">
            새로운 알림이 없습니다.
          </div>
        )}

        {!isLoading &&
          !isError &&
          notifications.map(notification => (
            <DropdownItem
              key={notification.id}
              onSelect={() => {
                navigate(`/streamings/${notification.sessionId}`);
                deleteNotification(notification.id);
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  {notification.title}
                </span>
                <span className="text-xs text-gray-500">
                  {notification.message}
                </span>
              </div>
            </DropdownItem>
          ))}
      </DropdownContent>
    </Dropdown>
  );
}
