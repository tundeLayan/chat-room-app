export interface User {
    id: string;
    username: string;
}

export interface ChatRoom {
    id: string;
    name: string;
    userCount: number;
}

export interface Message {
    id: string;
    content: string;
    author: User;
    reactions: Reaction[];
}

export interface Reaction {
    id: string;
    type: 'like' | 'dislike';
    user: User;
}

export interface ChatStore {
    user: User | null;
    activeRooms: Set<string>;
    messages: Record<string, Message[]>;
    setUser: (user: User | null) => void;
    joinRoom: (roomId: string) => void;
    leaveRoom: (roomId: string) => void;
    addMessage: (roomId: string, message: Message) => void;
    updateReaction: (
        roomId: string,
        messageId: string,
        reaction: Reaction
    ) => void;
}
