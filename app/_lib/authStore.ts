import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthState } from './store-types';
import { trpc } from './trpc/Provider';
// import { trpc } from '../utils/trpc';
// import { AuthState } from '../types';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: async (username: string) => {
                try {
                    const user = await trpc.auth.login.mutate({ username });
                    set({ user, isAuthenticated: true });

                    // Store auth token in localStorage (you might want to use cookies instead)
                    localStorage.setItem('chatAuthToken', user.id);
                } catch (error) {
                    console.error('Login failed:', error);
                    throw error;
                }
            },
            logout: () => {
                set({ user: null, isAuthenticated: false });
                localStorage.removeItem('chatAuthToken');
            },
        }),
        {
            name: 'chat-auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
