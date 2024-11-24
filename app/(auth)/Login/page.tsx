'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoginForm from './_module/components/LoginForm';
import { useChatStore } from '@/app/_lib/store';

const Login = () => {
    const user = useChatStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/chat');
        }
    }, [user, router]);

    return <LoginForm />;
};

export default Login;
