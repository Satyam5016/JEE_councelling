import { motion } from 'framer-motion';
import {
    Target, ShieldCheck, Users, Zap, Search,
    BarChart3, Filter, PieChart, Layout,
    CheckCircle2, ArrowRight, BookOpen, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        initial: {},
        whileInView: {
            transition: {
                staggerChildren: 0.1
            }
        },
        viewport: { once: true }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* 1. HERO SECTION */}
            <section className="relative py-24 px-6 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 opacity-70"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-[#1E3A8A] mb-8 tracking-tight">
                            About Our JEE <br />
                            <span className="text-brand-orange">Counselling Platform</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                            Helping students navigate the complex world of JoSAA and CSAB counselling with data-driven insights and personalized guidance.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/pricing')}
                                className="px-10 py-5 bg-brand-orange text-white rounded-2xl font-black text-lg hover:bg-[#F4511E] transition-all shadow-xl shadow-brand-orange/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Explore Counselling Packages <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. OUR MISSION SECTION */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            className="lg:w-1/2"
                            {...fadeIn}
                        >
                            <span className="text-brand-orange font-black uppercase tracking-widest text-sm mb-4 block">Our Drive</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1E3A8A] mb-8 tracking-tight">
                                Our Mission
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                                JoSAA counselling can be overwhelming. Thousands of students settle for less-than-ideal colleges due to a lack of structured data. Our mission is to bridge this gap by providing accurate rank predictions and deep analytical insights.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: Target, title: 'Accuracy', text: 'Real-time data modeling based on official seating and cutoff trends.' },
                                    { icon: ShieldCheck, title: 'Transparency', text: 'No hidden biases. Just pure, data-backed guidance for every student.' },
                                    { icon: Users, title: 'Student-First Approach', text: 'We prioritize your ambitions, helping you find the perfect branch in the best college.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                                            <item.icon className="w-6 h-6 text-brand-orange" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-slate-500 font-medium">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2 grid grid-cols-2 gap-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-brand-orange/30 transition-all">
                                <span className="text-5xl font-black text-[#1E3A8A] mb-2">99%</span>
                                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Prediction Accuracy</span>
                            </div>
                            <div className="bg-brand-orange p-8 rounded-[32px] shadow-xl shadow-brand-orange/20 flex flex-col items-center justify-center text-center mt-8">
                                <span className="text-5xl font-black text-white mb-2">500+</span>
                                <span className="text-white/80 font-bold uppercase tracking-widest text-xs">Students Guided</span>
                            </div>
                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                                <span className="text-5xl font-black text-[#1E3A8A] mb-2">24/7</span>
                                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Platform Access</span>
                            </div>
                            <div className="bg-slate-900 p-8 rounded-[32px] shadow-xl flex flex-col items-center justify-center text-center mt-8">
                                <span className="text-5xl font-black text-white mb-2">100%</span>
                                <span className="text-white/60 font-bold uppercase tracking-widest text-xs">Secure Payments</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. WHAT MAKES US DIFFERENT */}
            <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight italic">What Makes Us Different?</h2>
                        <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        {[
                            { icon: Zap, title: 'AI-based Rank Prediction', text: 'Proprietary algorithms that simulate JoSAA rounds based on historical shifts.' },
                            { icon: Search, title: 'Real Cutoff Data Analysis', text: 'Verified data from official sources, cleaned and structured for easy comparison.' },
                            { icon: Filter, title: 'State & Category Filtering', text: 'Highly granular filtering including HS/OS quotas and detailed category rules.' },
                            { icon: PieChart, title: 'Branch Probability System', text: 'See exactly how likely you are to enter a specific branch in your dream NIT.' },
                            { icon: Layout, title: 'Personalized Counselling', text: 'Customized preference list builders tailored to your priority institutions.' },
                            { icon: GraduationCap, title: 'Expert Mentorship', text: 'Optional 1-on-1 sessions with experts who have cleared JEE themselves.' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="bg-white/5 backdrop-blur-sm p-10 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all pointer-events-auto group"
                            >
                                <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed font-medium">{feature.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. HOW IT WORKS */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-[#1E3A8A] mb-4">How It Works</h2>
                        <p className="text-slate-500 text-lg font-medium">Three simple steps to your dream college</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>

                        <div className="grid md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { step: '01', title: 'Enter Details', text: 'Input your rank, category, and preferences into our secure portal.', icon: BarChart3 },
                                { step: '02', title: 'Get Predictions', text: 'Our AI engine generates a list of potential colleges and branch probabilities.', icon: Search },
                                { step: '03', title: 'Choose Confidently', text: 'Finalize your JoSAA choices using our data-backed suggestions.', icon: CheckCircle2 }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="text-center bg-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <div className="w-24 h-24 bg-sky-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center mx-auto mb-8 relative group cursor-default">
                                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                                            {item.step}
                                        </div>
                                        <item.icon className="w-10 h-10 text-brand-orange" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1E3A8A] mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 font-medium max-w-[250px] mx-auto">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TRUST & CREDIBILITY SECTION */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="container mx-auto max-w-7xl text-center">
                    <h2 className="text-4xl font-black text-[#1E3A8A] mb-16 tracking-tight italic">Trusted by JEE Aspirants</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 text-left relative"
                            {...fadeIn}
                        >
                            <div className="flex items-center gap-1 text-amber-500 mb-6">
                                {[1, 2, 3, 4, 5].map(star => <CheckCircle2 key={star} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-slate-600 font-medium italic mb-8">
                                "The rank predictor was surprisingly accurate! It suggested colleges I hadn't even considered, and I finally got into NIT Calicut. The interface is so clean."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-black text-[#1E3A8A]">AY</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Aryan Yadav</h4>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">NIT Calicut Student</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 text-left relative"
                            {...fadeIn}
                        >
                            <div className="flex items-center gap-1 text-amber-500 mb-6">
                                {[1, 2, 3, 4, 5].map(star => <CheckCircle2 key={star} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-slate-600 font-medium italic mb-8">
                                "Comparing colleges was the best feature. I could see placement statistics and cutoff trends in one place rather than searching 50 websites."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center font-black text-sky-600">SM</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Sneha Mishra</h4>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">JEE Mains 2023 Aspirant</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 6. TEAM OR FOUNDER SECTION */}
            <section className="py-24 px-6 bg-white border-y border-slate-100">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <span className="text-brand-orange font-black uppercase tracking-widest text-sm mb-4 block">The Builders</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1E3A8A] mb-8 tracking-tight">
                                Built by Engineers, <br />
                                <span className="text-slate-400">for Aspirants</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                                We are a team of passionate developers and former JEE aspirants who know the stress of counselling nights. We've combined our expertise in modern technology with deep domain knowledge to create a platform that is accurate, fast, and student-focused.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-5 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600">React & Vite</span>
                                <span className="px-5 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600">AI Modelling</span>
                                <span className="px-5 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600">Verified Datasets</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            {/* Founder Profile Card */}
                            <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-brand-orange/30"></div>
                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8">
                                        <GraduationCap className="w-12 h-12 text-brand-orange" />
                                    </div>
                                    <h3 className="text-3xl font-black mb-2">Our Tech Legacy</h3>
                                    <p className="text-white/60 text-lg font-medium leading-relaxed mb-10">
                                        Rooted in IIT-standard engineering, our platform handles complex data matching to give you a seamless experience. We believe everyone deserves a chance to study at the best college for their rank.
                                    </p>
                                    <button
                                        onClick={() => navigate('/services')}
                                        className="h-14 px-8 bg-brand-orange rounded-2xl font-black hover:bg-[#F4511E] transition-all flex items-center gap-2"
                                    >
                                        Meet our Team <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CALL TO ACTION SECTION */}
            <section className="py-24 px-6 bg-brand-orange text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <motion.div {...fadeIn}>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                            Ready to Plan Your JEE <br />
                            Counselling Smartly?
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/rank-predictor')}
                                className="px-10 py-5 bg-white text-brand-orange rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-2xl hover:scale-[1.05] active:scale-[0.98]"
                            >
                                Try Rank Predictor
                            </button>
                            <button
                                onClick={() => navigate('/pricing')}
                                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl hover:scale-[1.05] active:scale-[0.98]"
                            >
                                View Packages
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
