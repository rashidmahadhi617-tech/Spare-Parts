import React from 'react';
import {
  Smartphone,
  Share2,
  PlusSquare,
  ExternalLink,
  X,
  CheckCircle2,
  DownloadCloud,
  Monitor,
  Sparkles,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'sw' | 'en';
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with App Icon and Title */}
        <div className="bg-gradient-to-r from-[#107C41] to-[#0B552C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <img
              src="/icon.svg"
              alt="Spea za Pikipiki"
              className="w-12 h-12 rounded-xl shadow-md border border-white/30 bg-white/10 p-1"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-bold tracking-tight">
                  {lang === 'sw' ? 'Sakinisha Kama App (PWA)' : 'Install as Application (PWA)'}
                </h2>
                <span className="bg-amber-400 text-neutral-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  APP
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {lang === 'sw'
                  ? 'Inafanya kazi bila intaneti (Offline), skrini nzima kama app ya simu'
                  : 'Works offline with standalone fullscreen experience'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs text-neutral-700">
          {/* Direct Native Install Button if browser supports beforeinstallprompt */}
          {isInstallable && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-emerald-900">
                <Sparkles className="text-emerald-600 shrink-0" size={18} />
                <div>
                  <div className="font-bold">
                    {lang === 'sw' ? 'Kivinjari Kiko Tayari!' : 'Browser is Ready!'}
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    {lang === 'sw'
                      ? 'Bofya hapa chini kusakinisha moja kwa moja kwenye simu au kompyuta yako.'
                      : 'Click below to install directly to your home screen or desktop.'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleNativeInstall}
                className="px-4 py-2 bg-[#107C41] hover:bg-[#0c5e31] text-white font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-transform active:scale-95 text-xs"
              >
                <DownloadCloud size={15} />
                <span>{lang === 'sw' ? 'Sakinisha Sasa' : 'Install Now'}</span>
              </button>
            </div>
          )}

          {/* Already installed state */}
          {isInstalled && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center space-x-2 text-blue-900">
              <CheckCircle2 size={18} className="text-blue-600" />
              <span>
                {lang === 'sw'
                  ? 'Tayari programu hii imesakinishwa kwenye kifaa chako!'
                  : 'This application is already installed on your device!'}
              </span>
            </div>
          )}

          {/* Device Specific Step-by-Step Instructions */}
          <div className="space-y-3">
            <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              {lang === 'sw' ? 'Miongozo ya Kusakinisha kwa Kila Kifaa:' : 'Installation Guides by Device:'}
            </h3>

            {/* Android / Chrome Guide */}
            <div className="border border-neutral-200 rounded-lg p-3 bg-neutral-50/70 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center space-x-2 font-bold text-neutral-800 mb-1">
                <Smartphone size={15} className="text-emerald-600" />
                <span>{lang === 'sw' ? 'Simu za Android (Google Chrome)' : 'Android Phones (Google Chrome)'}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-neutral-600 ml-1">
                <li>
                  {lang === 'sw'
                    ? 'Bofya vitone vitatu (⋮) vilivyopo juu kulia mwa kivinjari cha Chrome.'
                    : 'Tap the three dots (⋮) menu at the top right of Chrome.'}
                </li>
                <li>
                  {lang === 'sw'
                    ? 'Chagua "Weka kwenye skrini ya mwanzo" (Add to Home screen) au "Sakinisha programu" (Install app).'
                    : 'Select "Add to Home screen" or "Install app".'}
                </li>
                <li>
                  {lang === 'sw'
                    ? 'Aikoni ya "Spea za Pikipiki" itaonekana kwenye simu yako kama app nyingine zote!'
                    : 'The app icon will be added to your home screen!'}
                </li>
              </ol>
            </div>

            {/* iPhone / iPad Guide */}
            <div className="border border-neutral-200 rounded-lg p-3 bg-neutral-50/70 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center space-x-2 font-bold text-neutral-800 mb-1">
                <Share2 size={15} className="text-blue-600" />
                <span>{lang === 'sw' ? 'iPhone & iPad (Safari)' : 'iPhone & iPad (Safari)'}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-neutral-600 ml-1">
                <li>
                  {lang === 'sw'
                    ? 'Bofya kitufe cha Kushiriki (Share / alama ya mraba wenye mshale unaoelekeza juu).'
                    : 'Tap the Share icon (square with arrow pointing up) in Safari toolbar.'}
                </li>
                <li>
                  {lang === 'sw'
                    ? 'Shuka chini na ubofye "Add to Home Screen" (Weka kwenye Skrini ya Mwanzo).'
                    : 'Scroll down and tap "Add to Home Screen".'}
                </li>
                <li>
                  {lang === 'sw'
                    ? 'Bofya "Add" juu kulia ili kukamilisha.'
                    : 'Tap "Add" in top right to finish.'}
                </li>
              </ol>
            </div>

            {/* Desktop / Computer Guide */}
            <div className="border border-neutral-200 rounded-lg p-3 bg-neutral-50/70 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center space-x-2 font-bold text-neutral-800 mb-1">
                <Monitor size={15} className="text-purple-600" />
                <span>{lang === 'sw' ? 'Kompyuta (Chrome, Edge)' : 'Computer (Chrome, Edge)'}</span>
              </div>
              <p className="text-[11px] text-neutral-600 ml-1">
                {lang === 'sw'
                  ? 'Bofya alama ya kusakinisha au kompyuta iliyopo upande wa kulia wa sehemu ya anwani (URL address bar), kisha chagua "Install Spea za Pikipiki".'
                  : 'Click the install icon on the right side of the browser address bar, then click "Install".'}
              </p>
            </div>
          </div>

          {/* Quick link to open in new tab if in preview iframe */}
          <div className="bg-neutral-100 rounded-lg p-3 flex items-center justify-between text-[11px]">
            <span className="text-neutral-600">
              {lang === 'sw'
                ? 'Ili kupata uzoefu kamili wa kusakinisha kwenye kivinjari:'
                : 'For best installation in standalone window:'}
            </span>
            <button
              onClick={handleOpenInNewTab}
              className="px-2.5 py-1 bg-white border border-neutral-300 rounded font-semibold text-neutral-800 hover:bg-neutral-50 flex items-center space-x-1"
            >
              <ExternalLink size={12} />
              <span>{lang === 'sw' ? 'Fungua Kwenye Kichupo Kipya' : 'Open in New Tab'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-xs font-semibold"
          >
            {lang === 'sw' ? 'Nimeelewa (Funga)' : 'Got it (Close)'}
          </button>
        </div>
      </div>
    </div>
  );
};
