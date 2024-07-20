"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Adjust the import path as needed
import { usePathname } from 'next/navigation';
import Unauthorized from './Unauthorized';
import Loading from '../Loading';

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isLoaded, isAuthorized } = useAuth();
    const pathname = usePathname();

    if (pathname === '/sign-in') {
        return children;
    }

    if (!isLoaded) {
        return <Loading text='Authenticating...' />;
    }

    if (!isAuthorized) {
        return <Unauthorized />;
    }

    return children;
}