import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface ProviderContactOptionsProps {
  email: string;
  phone: string;
}

export const ProviderContactOptions: React.FC<ProviderContactOptionsProps> = ({ email, phone }) => {
  return (
    <div className="flex gap-2">
      <a
        href={`mailto:${email}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#ff57221a] text-[#ff5722] rounded-md py-2 px-4 hover:bg-[#ff57222a] transition-colors"
      >
        <Mail className="h-4 w-4" />
        <span>Email</span>
      </a>
      <a
        href={`tel:${phone}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#ff5722] text-white rounded-md py-2 px-4 hover:bg-[#f4511e] transition-colors"
      >
        <Phone className="h-4 w-4" />
        <span>Call</span>
      </a>
    </div>
  );
};