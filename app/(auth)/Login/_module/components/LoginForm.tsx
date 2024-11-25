'use client';
import React, { useState } from 'react';

import { useChatStore } from '@/app/_lib/store';
import { trpc } from '@/app/_lib/trpc/Provider';
// import { trpc } from '@/lib/trpc';

const LoginForm = () => {
    const [username, setUsername] = useState('');

    const setUser = useChatStore((state) => state.setUser);

    const loginMutation = trpc.user.login.useMutation({
        onSuccess: (user) => setUser(user),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ username });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 p-6"
            >
                <h1 className="text-2xl font-bold">Join Chat</h1>
                <div>
                    <label className="block text-sm font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-md border p-2"
                        minLength={3}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loginMutation.isLoading}
                    className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {loginMutation.isLoading ? 'Joining...' : 'Join'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
