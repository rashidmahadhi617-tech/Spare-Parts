import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  lang: 'sw' | 'en';
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ lang }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-12 left-4 z-50 flex items-center space-x-2 bg-amber-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium border border-amber-400 animate-pulse">
      <WifiOff size={15} />
      <span>
        {lang === 'sw'
          ? 'Hali ya Nje ya Mtandao (Offline) — App inafanya kazi bila intaneti!'
          : 'Offline Mode — App is fully operational offline!'}
      </span>
    </div>
  );
};
