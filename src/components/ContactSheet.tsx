import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building2, User, Save, FileSpreadsheet } from 'lucide-react';

interface ContactSheetProps {
  contact: {
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    address: string;
    currency: string;
    notes: string;
  };
  onUpdateContact: (newContact: any) => void;
  lang: 'sw' | 'en';
}

export const ContactSheet: React.FC<ContactSheetProps> = ({
  contact,
  onUpdateContact,
  lang,
}) => {
  const [formData, setFormData] = useState(contact);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 bg-white min-h-[calc(100vh-180px)] select-none max-w-4xl">
      {/* Title */}
      <div className="border-b border-neutral-300 pb-3 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-neutral-800 tracking-tight flex items-center gap-2">
            <Building2 className="text-[#107C41]" size={22} />
            <span>{formData.businessName}</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {lang === 'sw'
              ? 'Taarifa za mawasiliano ya biashara na mmiliki wa kiolezo cha Excel.'
              : 'Business contact details and workbook metadata.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-semibold">
            SM Template T3
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              {lang === 'sw' ? 'Jina la Biashara / Duka:' : 'Business Name:'}
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              {lang === 'sw' ? 'Jina la Mmiliki / Meneja:' : 'Owner / Manager Name:'}
            </label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              {lang === 'sw' ? 'Nambari ya Simu:' : 'Phone Number:'}
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              {lang === 'sw' ? 'Barua Pepe (Email):' : 'Email Address:'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              {lang === 'sw' ? 'Mahali / Mji:' : 'Location / Address:'}
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              {lang === 'sw' ? 'Sarafu (Currency):' : 'Default Currency:'}
            </label>
            <input
              type="text"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none font-mono font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-neutral-700 mb-1">
            {lang === 'sw' ? 'Maelezo ya Ziada ya Mfumo:' : 'System & Usage Notes:'}
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full border border-neutral-300 rounded px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#107C41] hover:bg-[#0c5e31] text-white rounded font-medium text-xs shadow-xs"
          >
            <Save size={14} />
            <span>{lang === 'sw' ? 'Hifadhi Taarifa za Mawasiliano' : 'Save Contact Info'}</span>
          </button>
          {saved && (
            <span className="text-emerald-700 font-medium text-xs">
              ✓ {lang === 'sw' ? 'Imehifadhiwa!' : 'Saved successfully!'}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
