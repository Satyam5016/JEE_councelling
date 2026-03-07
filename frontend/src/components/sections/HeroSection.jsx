import { CheckCircle2, ChevronDown, Building2, Trophy } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative bg-[#0B1A2F] text-white pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-screen flex items-center">
            {/* Decorative faint pattern */}
            <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-sm font-medium text-slate-300">Trusted by 2000+ Students</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-[70px] font-bold leading-[1.1] tracking-tight mb-8">
                            Your Dream <span className="text-brand-orange">IIT</span><br />
                            Starts Here<br />
                            With Expert Guidance
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
                            Personalized JEE counseling for IIT, NIT & IIIT admissions. Get AI-powered college predictions and expert mentorship to secure your dream college.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5 mb-12 w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange text-white font-bold text-lg shadow-[0_8px_20px_-6px_rgba(255,87,34,0.6)] transition-all hover:bg-[#F4511E] hover:-translate-y-1">
                                Book Free Counseling
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg transition-all hover:bg-white hover:text-[#0B1A2F]">
                                Predict Your College
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 text-sm md:text-base font-medium text-slate-300">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-green-500" />
                                <span>2000+ Students Placed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-green-500" />
                                <span>98% Success Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Images and floating badges */}
                    <div className="w-full lg:w-1/2 relative lg:h-[600px] flex justify-center items-center mt-12 lg:mt-0">
                        {/* Main Image placeholder */}
                        <div className="relative w-full max-w-md lg:max-w-none lg:w-[90%] h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1000"
                                alt="Happy Student"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2F]/80 to-transparent"></div>
                        </div>

                        {/* Floating Badge 1 - Top Right */}
                        <div className="absolute -top-6 -right-2 lg:-right-6 bg-white p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <Building2 size={24} className="text-primary-blue" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Top Choice</p>
                                <p className="text-slate-800 font-bold text-lg">IIT Bombay</p>
                            </div>
                        </div>

                        {/* Floating Badge 2 - Bottom Left */}
                        <div className="absolute top-[60%] lg:top-[70%] -left-4 lg:-left-12 bg-white p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                            <div className="bg-orange-100 p-3 rounded-xl">
                                <Trophy size={24} className="text-brand-orange" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Achievement</p>
                                <p className="text-slate-800 font-bold text-lg">AIR 247</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

export default HeroSection;
