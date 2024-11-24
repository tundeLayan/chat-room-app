import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatStore } from './store-types';

export const useChatStore = create<ChatStore>()(
    persist(
        (set) => ({
            user: null,
            activeRooms: new Set(),
            messages: {},

            setUser: (user) => set({ user }),

            joinRoom: (roomId) =>
                set((state) => ({
                    activeRooms: new Set([...state.activeRooms, roomId]),
                })),

            leaveRoom: (roomId) =>
                set((state) => {
                    const newRooms = new Set(state.activeRooms);
                    newRooms.delete(roomId);
                    return { activeRooms: newRooms };
                }),

            addMessage: (roomId, message) =>
                set((state) => ({
                    messages: {
                        ...state.messages,
                        [roomId]: [message, ...(state.messages[roomId] || [])],
                    },
                })),

            updateReaction: (roomId, messageId, reaction) =>
                set((state) => {
                    const roomMessages = state.messages[roomId] || [];
                    const updatedMessages = roomMessages.map((msg) =>
                        msg.id === messageId
                            ? {
                                  ...msg,
                                  reactions: [
                                      ...msg.reactions.filter(
                                          (r) => r.user.id !== reaction.user.id
                                      ),
                                      reaction,
                                  ],
                              }
                            : msg
                    );
                    return {
                        messages: {
                            ...state.messages,
                            [roomId]: updatedMessages,
                        },
                    };
                }),
        }),
        {
            name: 'chat-store',
            partialize: (state) => ({ user: state.user }),
        }
    )
);
