import { Headset } from 'lucide-react';

const FloatingContactButton = () => {
    return (
        <button className="fixed bottom-6 right-6 z-50 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-full py-3 px-6 flex items-center gap-3 shadow-[0_10px_25px_-5px_rgba(30,41,59,0.5)] transition-all duration-300 hover:scale-105 group border border-slate-700">
            <Headset size={22} className="text-brand-orange group-hover:animate-bounce" />
            <span className="font-semibold text-[15px]">Talk with Us</span>
        </button>
    );
};

export default FloatingContactButton;
