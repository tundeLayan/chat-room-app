// import { Message } from '@prisma/client';

// import { trpc } from '@/lib/trpc';
import { useChatStore } from '@/app/_lib/store';
import { Message } from '@/app/_lib/store-types';
import { trpc } from '@/app/_lib/trpc/Provider';

interface MessageListProps {
    messages: Message[];
    roomId: string;
}

export const MessageList = ({ messages, roomId }: MessageListProps) => {
    const user = useChatStore((state) => state.user);
    const reactionMutation = trpc.message.react.useMutation();

    const handleReaction = (messageId: string, type: 'like' | 'dislike') => {
        reactionMutation.mutate({
            messageId,
            userId: user!.id,
            type,
        });
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className="flex space-x-2"
                >
                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">
                                {message.author.username}
                            </span>
                            <span className="text-sm text-gray-500">
                                {new Date(
                                    message.createdAt
                                ).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="mt-1">{message.content}</p>
                        <div className="mt-2 flex space-x-2">
                            <button
                                onClick={() =>
                                    handleReaction(message.id, 'like')
                                }
                                className="flex items-center space-x-1 text-sm"
                            >
                                👍{' '}
                                {
                                    message.reactions.filter(
                                        (r) => r.type === 'like'
                                    ).length
                                }
                            </button>
                            <button
                                onClick={() =>
                                    handleReaction(message.id, 'dislike')
                                }
                                className="flex items-center space-x-1 text-sm"
                            >
                                👎{' '}
                                {
                                    message.reactions.filter(
                                        (r) => r.type === 'dislike'
                                    ).length
                                }
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
