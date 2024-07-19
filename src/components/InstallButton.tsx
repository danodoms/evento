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
                <div className="flex gap-4 border py-2 px-4 rounded-lg items-center hover:bg-slate-500 hover:bg-opacity-20 cursor-pointer" onClick={handleInstallClick} >

                    <Download />

                    <div>
                        <p className="flex gap-2 font-semibold">Install this web-app</p>
                        <p className="opacity-50 text-sm">to enable offline features</p>
                    </div>

                </div>
                <p className="text-xs text-danger italic">Currently in development</p>
            </div>

        )
    );
};

export default InstallButton;
