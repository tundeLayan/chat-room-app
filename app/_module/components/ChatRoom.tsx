'use client';

// import { trpc } from '@/lib/trpc';
import { useChatStore } from '@/app/_lib/store';
import { MessageList } from './MessageList';
import { trpc } from '@/app/_lib/trpc/Provider';
import { MessageInput } from './MessageInput';
// import { MessageInput } from './MessageInput';

interface ChatRoomProps {
    roomId: string;
}

export const ChatRoom = ({ roomId }: ChatRoomProps) => {
    const addMessage = useChatStore((state) => state.addMessage);
    const updateReaction = useChatStore((state) => state.updateReaction);

    const utils = trpc.useContext();

    const { data: messages } = trpc.message.list.useQuery(
        { roomId },
        { initialData: [] }
    );

    // Subscribe to new messages
    trpc.message.onNewMessage.useSubscription(
        { roomId },
        {
            onData: (message) => {
                addMessage(roomId, message);
            },
        }
    );

    // Subscribe to new reactions
    trpc.message.onNewReaction.useSubscription(
        { roomId },
        {
            onData: (reaction) => {
                updateReaction(roomId, reaction.messageId, reaction);
            },
        }
    );

    // Subscribe to user activity
    trpc.chatRoom.onUserActivity.useSubscription(
        { roomId },
        {
            onData: (activity) => {
                utils.chatRoom.list.invalidate();
            },
        }
    );

    return (
        <div className="flex h-full flex-col">
            <MessageList
                messages={messages}
                roomId={roomId}
            />
            <MessageInput roomId={roomId} />
        </div>
    );
};
