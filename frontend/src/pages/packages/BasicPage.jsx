import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import {
    Check, Sparkles, ArrowRight, Zap, Target, Globe,
    BookOpen, BarChart3, FileText, Mail, ShieldCheck,
    Crown, Clock, ChevronRight, CheckCircle2, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ComparisonTable from '../../components/ComparisonTable';
import { createOrder, verifyPayment, setAuthToken, getProfile, syncUser } from '../../utils/api';
import toast from 'react-hot-toast';

const BasicPage = () => {
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getToken();
                setAuthToken(token);
                const { data } = await getProfile();
                setProfile(data.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setIsProfileLoading(false);
            }
        };

        if (isSignedIn) fetchProfile();
        else setIsProfileLoading(false);
    }, [isSignedIn, getToken]);

    const handlePayment = async () => {
        if (!isSignedIn) {
            window.location.href = '/sign-in';
            return;
        }
        setLoading(true);
        try {
            const token = await getToken();
            setAuthToken(token);

            // Ensure user is synced
            await syncUser({
                clerkId: user.id,
                name: user.fullName || user.firstName || 'User',
                email: user.primaryEmailAddress?.emailAddress,
            });

            const { data } = await createOrder('basic');
            const orderData = data.data;

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'JEE Counselling',
                description: 'Basic Plan Upgrade',
                order_id: orderData.orderId,
                handler: async (response) => {
                    try {
                        const currentToken = await getToken();
                        setAuthToken(currentToken);
                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        if (verifyRes.data.success) {
                            toast.success('Payment Successful! Plan activated.');
                            window.location.href = '/payment-success?plan=basic';
                        }
                    } catch (err) {
                        console.error('Verification failed:', err);
                        toast.error('Payment verification failed.');
                    }
                },
                prefill: {
                    name: user.fullName || '',
                    email: user.primaryEmailAddress?.emailAddress || '',
                },
                theme: { color: '#0ea5e9' },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Failed to initiate payment.');
        } finally {
            setLoading(false);
        }
    };

    if (isProfileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const hasBasic = profile?.plan === 'basic';
    const hasHigherPlan = profile?.plan === 'elite' || profile?.plan === 'premium';

    if (hasBasic || hasHigherPlan) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-slate-200">
                    <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        {hasHigherPlan ? <Crown className="w-10 h-10 text-amber-600" /> : <ShieldCheck className="w-10 h-10 text-sky-600" />}
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">
                        {hasHigherPlan ? 'You already have higher plan access' : 'You already have Basic Plan'}
                    </h1>
                    <p className="text-slate-500 text-lg mb-10">
                        {hasHigherPlan
                            ? 'You are currently on a superior plan with more advanced features.'
                            : 'Welcome to the club! You have access to all Basic prediction tools.'}
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-10 py-4 bg-sky-600 text-white rounded-2xl font-black text-lg hover:bg-sky-500 transition-all flex items-center justify-center gap-3 mx-auto shadow-xl shadow-sky-600/20"
                    >
                        Go to Dashboard <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 font-sans selection:bg-sky-100 selection:text-sky-900">
            {/* 1. HERO SECTION */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-50"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
                            Best for Beginners
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                            Smart Start <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                                JEE Counselling Plan
                            </span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Affordable & Essential Tools for JEE Aspirants. Start your journey with precision and confidence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-3xl border border-slate-200 shadow-sm">
                                <span className="text-slate-400 line-through text-lg font-bold">₹299</span>
                                <span className="text-4xl font-black text-slate-900">₹199</span>
                                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">SAVE 33%</span>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="px-10 py-5 bg-gradient-to-r from-sky-600 to-emerald-500 text-white rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-sky-500/30 transition-all hover:scale-[1.05] active:scale-[0.98] flex items-center gap-3"
                            >
                                {loading ? 'Processing...' : 'Get Basic Plan'}
                                {!loading && <Zap className="w-6 h-6 fill-white" />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. FEATURES SECTION */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: '5 Rank Predictions', text: 'Accurate daily predictions based on the latest NTA data patterns.' },
                            { icon: Globe, title: 'Top 20 College Suggestions', text: 'Curated list of the best institutions reachable within your rank bracket.' },
                            { icon: BookOpen, title: 'PY Cutoff Access', text: 'Instantly view verified cutoff data from the last 3 counselling seasons.' },
                            { icon: BarChart3, title: 'College Comparison Bot', text: 'Compare fees, placement and rank trends for two colleges side-by-side.' },
                            { icon: FileText, title: 'Guidance PDF', text: 'Download our comprehensive 10-step guide to JoSAA/CSAB counselling.' },
                            { icon: Mail, title: 'Email Support', text: 'Query resolution within 48 hours from our basic support desk.' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/5 transition-all group"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                                    <feature.icon className="w-8 h-8 text-sky-600 group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. VALUE SECTION */}
            <section className="py-24 px-4 bg-white border-y border-slate-100 overflow-hidden relative">
                <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500 rounded-full blur-[100px] -mr-64 -mt-64"></div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic">Why pay ₹199?</h2>
                        <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {[
                            { title: 'Save Hours of Research', text: 'Stop manually crawling through PDFs and scattered forums. We do the heavy lifting for you.' },
                            { title: 'Avoid Wrong Selections', text: 'One wrong choice in the preference list can cost you a year. Get data-backed suggestions.' },
                            { title: 'Structured System', text: 'Everything you need in one clean dashboard rather than 50 browser tabs.' },
                            { title: 'Verified Cutoff Data', text: 'Access official, cleaned data directly rather than unverified crowd-sourced info.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. PRICING CARD */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[3rem] p-1 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.9rem] p-12 sm:p-20 text-center relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-48 -mb-48"></div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl font-black text-white mb-2 tracking-tight">Basic Plan</h3>
                                <p className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-12">Full Counselling Season Validity</p>

                                <div className="flex items-baseline justify-center gap-2 mb-12">
                                    <span className="text-8xl font-black text-white tracking-tighter">₹199</span>
                                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">/ one-time</span>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className="w-full max-w-md py-6 bg-sky-500 text-white rounded-2xl font-black text-2xl hover:bg-sky-400 transition-all flex items-center justify-center gap-4 mx-auto shadow-2xl shadow-sky-500/40 active:scale-95 mb-10"
                                >
                                    {loading ? 'Processing...' : isSignedIn ? 'GET BASIC PLAN' : 'LOGIN TO PURCHASE'}
                                    {!loading && <ChevronRight className="w-8 h-8" />}
                                </button>

                                <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secure Payment</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Unlock</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Data</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. UPGRADE SECTION */}
            <section className="py-24 px-4 bg-sky-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 text-sky-200/50">
                    <Crown className="w-64 h-64 -rotate-12" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Want More Advanced Predictions?</h2>
                    <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto">Step up to the Elite Plan for unlimited predictions, full college lists, and deep branch probability analysis.</p>

                    <div className="bg-white max-w-md mx-auto rounded-[2.5rem] p-10 border border-slate-200 shadow-xl mb-12 text-left relative group hover:border-sky-300 transition-all">
                        <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg italic">Recommended</div>
                        <h4 className="text-2xl font-black text-slate-900 mb-4">Elite Plan Card</h4>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3 text-slate-600 font-medium">
                                <Check className="w-5 h-5 text-sky-500 shrink-0" />
                                <span>Unlimited Predictions</span>
                            </li>
                            <li className="flex gap-3 text-slate-600 font-medium">
                                <Check className="w-5 h-5 text-sky-500 shrink-0" />
                                <span>Full NIT/IIIT/GFTI List</span>
                            </li>
                            <li className="flex gap-3 text-slate-600 font-medium">
                                <Check className="w-5 h-5 text-sky-500 shrink-0" />
                                <span>AI Branch Probability %</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => navigate('/packages/elite')}
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                        >
                            Upgrade to Elite <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            <ComparisonTable highlightedPlan="elite" />
        </div>
    );
};

export default BasicPage;
