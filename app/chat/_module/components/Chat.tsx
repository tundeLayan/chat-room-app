'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/app/_lib/store';

import ChatRoomList from '@/app/_module/components/ChatRoomList';
import { ChatRoom } from '@/app/_module/components/ChatRoom';

const Chat = () => {
    const user = useChatStore((state) => state.user);
    const activeRooms = useChatStore((state) => state.activeRooms);
    const router = useRouter();

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/');
    //     }
    // }, [user, router]);

    // if (!user) return null;

    return (
        <div className="flex h-screen">
            <div className="w-80 border-r">
                <ChatRoomList />
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
                {Array.from(activeRooms).map((roomId) => (
                    <ChatRoom
                        key={roomId}
                        roomId={roomId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Chat;
