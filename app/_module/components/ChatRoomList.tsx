'use client';

import { useChatStore } from '@/app/_lib/store';
import { trpc } from '@/app/_lib/trpc/Provider';

const ChatRoomList = () => {
    const { data: rooms, isLoading } = trpc.chatRoom.list.useQuery();

    const user = useChatStore((state) => state.user);
    const activeRooms = useChatStore((state) => state.activeRooms);
    const joinRoom = useChatStore((state) => state.joinRoom);
    const leaveRoom = useChatStore((state) => state.leaveRoom);

    const joinMutation = trpc.chatRoom.join.useMutation({
        onSuccess: (room) => joinRoom(room.id),
    });
    const leaveMutation = trpc.chatRoom.leave.useMutation({
        onSuccess: (room) => leaveRoom(room.id),
    });

    if (isLoading) return <div>Loading rooms...</div>;

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-bold">Chat Rooms</h2>
            <div className="space-y-2">
                {rooms?.map((room) => (
                    <div
                        key={room.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                    >
                        <div>
                            <h3 className="font-medium">{room.name}</h3>
                            <p className="text-sm text-gray-500">
                                {room._count.users} users • Created{' '}
                                {new Date(room.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {activeRooms.has(room.id) ? (
                            <button
                                onClick={() =>
                                    leaveMutation.mutate({
                                        userId: user!.id,
                                        roomId: room.id,
                                    })
                                }
                                className="rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Leave
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    joinMutation.mutate({
                                        userId: user!.id,
                                        roomId: room.id,
                                    })
                                }
                                className="rounded bg-blue-500 px-4 py-2 text-white"
                            >
                                Join
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatRoomList;
