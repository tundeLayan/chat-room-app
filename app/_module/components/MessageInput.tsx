'use client';

import { useState } from 'react';

// import { trpc } from '@/lib/trpc';
import { useChatStore } from '@/app/_lib/store';
import { trpc } from '@/app/_lib/trpc/Provider';

interface MessageInputProps {
    roomId: string;
}

export const MessageInput = ({ roomId }: MessageInputProps) => {
    const [content, setContent] = useState('');
    const user = useChatStore((state) => state.user);

    const messageMutation = trpc.message.send.useMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        messageMutation.mutate({
            content: content.trim(),
            authorId: user!.id,
            roomId,
        });
        setContent('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t p-4"
        >
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-md border p-2"
                />
                <button
                    type="submit"
                    disabled={messageMutation.isLoading}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </form>
    );
};
