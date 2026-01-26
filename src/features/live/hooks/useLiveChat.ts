import { useEffect, useRef, useState } from 'react';

import type {
  ChatMessage,
  ClientMessageEvent,
  ServerEvent,
} from '@/features/live/types/chat';

type UseLiveChatParams = {
  streamingId: number;
};

export function useLiveChat({ streamingId }: UseLiveChatParams) {
  const socketRef = useRef<null | WebSocket>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://api.near05.com/v1/streamings/${streamingId}/chat`,
    );

    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onerror = () => {
      setIsConnected(false);
    };

    socket.onmessage = event => {
      const serverEvent: ServerEvent = JSON.parse(event.data);

      if (serverEvent.type === 'recent') {
        const recentMessages = serverEvent.items.map(mapServerEventToMessage);
        setMessages(recentMessages);
        return;
      }

      setMessages(prev => [...prev, mapServerEventToMessage(serverEvent)]);
    };

    return () => {
      socket.close();
    };
  }, [streamingId]);

  const sendMessage = (text: string) => {
    if (!socketRef.current) {
      return;
    }

    if (socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const payload: ClientMessageEvent = {
      text,
      type: 'message',
    };

    socketRef.current.send(JSON.stringify(payload));
  };

  return {
    isConnected,
    messages,
    sendMessage,
  };
}

//서버 이벤트를 UI에서 사용하는 ChatMessage 형태로 변환합니다.
function mapServerEventToMessage(
  event: Exclude<ServerEvent, { type: 'recent' }>,
): ChatMessage {
  return {
    kind: event.type,
    messageId: event.message_id,
    roomId: event.room_id,
    text: event.text,
    ts: event.ts,
    userId: event.user_id,
  };
}
