import { Phone, Mail, MessageCircle } from 'lucide-react';

const CTASplitSection = () => {
    return (
        <section className="w-full flex flex-col md:flex-row">
            {/* Left Full Width / Half Width Box */}
            <div className="w-full md:w-1/2 bg-brand-orange text-white p-12 md:p-20 lg:p-24 flex flex-col justify-center items-start">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    Ready to Secure Your IIT Seat?
                </h2>
                <p className="text-white/90 text-lg mb-10 max-w-md leading-relaxed">
                    Join thousands of successful students who achieved their dreams with our expert guidance. Start your journey today!
                </p>
                <button className="bg-white text-brand-orange font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Start Your Journey
                </button>
            </div>

            {/* Right Full Width / Half Width Box */}
            <div className="w-full md:w-1/2 bg-[#1E3A8A] text-white p-12 md:p-20 lg:p-24 flex flex-col justify-center items-start">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
                    Get Started Now
                </h2>

                <div className="flex flex-col gap-8 w-full">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Phone size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-xl">+91 98765 43210</p>
                            <p className="text-slate-300 text-sm">Call us anytime</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Mail size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-xl">info@jeecounseling.com</p>
                            <p className="text-slate-300 text-sm">Email us your queries</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-4 rounded-xl mt-4 transition-colors shadow-lg w-full sm:w-auto">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <MessageCircle size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-base leading-none mb-1">WhatsApp Now</p>
                            <p className="text-xs font-normal text-white/90">Instant support available</p>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASplitSection;
