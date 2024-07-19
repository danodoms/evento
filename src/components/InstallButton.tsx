// components/InstallButton.tsx

"use client";
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            (deferredPrompt as any).prompt();
            const { outcome } = await (deferredPrompt as any).userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    return (
        isVisible && (
            <div className='flex-col items-center justify-center flex gap-2'>
                <p className="text-xs text-danger italic opacity-50 mb-1">Currently in development</p>
                <div className="flex gap-4 border py-2 px-4 rounded-lg items-center hover:bg-slate-500 hover:bg-opacity-20 cursor-pointer shadow-lg shadow-blue-500/50 ring-offset-2 ring-2" onClick={handleInstallClick} >

                    <Download className='animate-bounce' />

                    <div>
                        <p className="flex gap-2 font-semibold">Install this web app</p>
                        <p className="opacity-50 text-xs">to enable offline features</p>
                    </div>

                </div>

            </div>

        )
    );
};

export default InstallButton;
