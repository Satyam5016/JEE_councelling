import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Zap, Target, BarChart3, Globe, Download, Clock, ShieldCheck, Crown, FileText } from 'lucide-react';
import ComparisonTable from '../../components/ComparisonTable';
import { createOrder, verifyPayment, setAuthToken, syncUser, getProfile } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ElitePage = () => {
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

    const handleUpgrade = async () => {
        if (!isSignedIn) {
            // Clerk login redirect is handled by sign-in button, 
            // but for programmatic check:
            window.location.href = '/sign-in';
            return;
        }
        setLoading(true);
        try {
            const token = await getToken();
            setAuthToken(token);
            await syncUser({
                clerkId: user.id,
                name: user.fullName || user.firstName || 'User',
                email: user.primaryEmailAddress?.emailAddress,
            });
            const { data } = await createOrder('elite');
            const orderData = data.data;

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'JEE Counselling',
                description: 'Elite Plan Upgrade',
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
                            window.location.href = '/payment-success?plan=elite';
                        }
                    } catch (err) {
                        console.error('Verification failed:', err);
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: user.fullName || '',
                    email: user.primaryEmailAddress?.emailAddress || '',
                },
                theme: { color: '#4f46e5' },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Upgrade error:', error);
            alert('Failed to initiate payment.');
        } finally {
            setLoading(false);
        }
    };

    if (isProfileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Access Control Check
    const hasElite = profile?.plan === 'elite';
    const hasPremium = profile?.plan === 'premium';

    if (hasElite || hasPremium) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-slate-200">
                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <Crown className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">
                        {hasPremium ? 'You have Premium access' : 'You are already an Elite Member'}
                    </h1>
                    <p className="text-slate-500 text-lg mb-10">
                        {hasPremium
                            ? 'You already have full access to all features including 1-on-1 calls.'
                            : 'You have access to all Elite features. Head over to your dashboard to start predicting!'}
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 mx-auto shadow-xl shadow-indigo-600/20"
                    >
                        Go to Dashboard <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24">
            {/* Hero Section */}
            <section className="relative bg-indigo-900 py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                            className="inline-block px-6 py-2 bg-indigo-500 text-white rounded-full text-xs font-black mb-8 uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/30"
                        >
                            ⭐ MOST POPULAR
                        </motion.div>
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
                        >
                            Elite AI-Powered <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 uppercase">
                                Counselling Plan
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-xl text-indigo-100/70 max-w-3xl mx-auto mb-0 leading-relaxed"
                        >
                            Advanced prediction models and comprehensive seat planning for serious JEE aspirants.
                        </motion.p>
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="mt-12"
                        >
                            <button
                                onClick={handleUpgrade}
                                className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-2xl hover:scale-[1.05]"
                            >
                                Upgrade to Elite
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* Features Column */}
                        <div className="lg:col-span-2 space-y-16">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1 }
                                    }
                                }}
                            >
                                <motion.h2
                                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                                    className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-4"
                                >
                                    <span className="w-12 h-1 bg-indigo-600 rounded-full"></span>
                                    Everything in Basic PLUS
                                </motion.h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { icon: Target, title: 'Unlimited Rank Predictions', text: 'Run as many combinations as you want' },
                                        { icon: Globe, title: 'Full College List (NIT, IIIT, GFTI)', text: 'Unlock every institution in the database' },
                                        { icon: BarChart3, title: 'Branch Probability %', text: 'AI-calculated chances for specific branches' },
                                        { icon: ShieldCheck, title: 'State Quota Analysis', text: 'Optimize results based on your home state' },
                                        { icon: Download, title: 'Downloadable PDF Report', text: 'Get a professional PDF of your analysis' },
                                        { icon: Clock, title: 'Priority Support (24hr)', text: 'Quick email responses from our experts' },
                                    ].map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                            className="flex gap-5 p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
                                        >
                                            <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                                                <feature.icon className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">{feature.title}</h3>
                                                <p className="text-slate-500 text-sm leading-relaxed mt-1">{feature.text}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Preview Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 ml-4">
                                    <Sparkles className="text-indigo-600" />
                                    Live Tools Preview
                                </h3>

                                <div className="grid sm:grid-cols-2 gap-8">
                                    {/* Chart Preview */}
                                    <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-xl">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Rank Probability Chart</span>
                                        </div>
                                        <div className="h-40 flex items-end gap-3 px-2">
                                            {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                                    className="flex-1 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-t-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* College Comparison Preview */}
                                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl flex flex-col justify-center">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">College Comparison Card</p>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                                <span className="text-sm font-bold text-indigo-900">NIT Trichy</span>
                                                <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Top Choice</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <span className="text-sm font-bold text-slate-800">NIT Warangal</span>
                                                <span className="text-xs text-slate-400">92% Prob.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Prediction Report Preview */}
                                <div className="bg-indigo-600 rounded-[2rem] p-1 shadow-xl">
                                    <div className="bg-white rounded-[1.8rem] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                                                <FileText className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-lg">Prediction Report Preview</h4>
                                                <p className="text-slate-500 text-sm">Download your personalized 15-page analysis</p>
                                            </div>
                                        </div>
                                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                                            <Download className="w-4 h-4" /> Download Sample
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:sticky lg:top-32 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-[2.5rem] p-1 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group"
                            >
                                <div className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-[2.2rem] p-10 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    <h3 className="text-2xl font-black mb-1 uppercase tracking-tight">Elite Plan</h3>
                                    <p className="text-indigo-100/70 text-xs mb-8 uppercase font-bold tracking-widest">Per Counselling Season</p>

                                    <div className="flex items-baseline gap-1 mb-10">
                                        <span className="text-7xl font-black">₹999</span>
                                        <span className="text-indigo-200 font-bold uppercase tracking-widest text-xs">/ Season</span>
                                    </div>

                                    <button
                                        onClick={handleUpgrade}
                                        disabled={loading}
                                        className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-lg hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 mb-8"
                                    >
                                        {loading ? 'Processing...' : isSignedIn ? 'UPGRADE TO ELITE' : 'SIGN IN TO UPGRADE'}
                                        {!loading && <Sparkles className="w-6 h-6" />}
                                    </button>

                                    <div className="space-y-4">
                                        <p className="text-xs text-indigo-100/60 font-bold uppercase tracking-[0.2em] mb-4">Core Benefits</p>
                                        {['Unlimited AI Predictions', 'Full NIT/IIIT List', 'Priority Support'].map((f) => (
                                            <div key={f} className="flex items-center gap-3 text-sm text-indigo-50 font-medium">
                                                <Check className="w-5 h-5 text-indigo-300 shrink-0" />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="mt-10 text-[10px] text-indigo-200/50 font-bold flex items-center justify-center gap-2 uppercase tracking-widest border-t border-white/10 pt-6">
                                        <ShieldCheck className="w-4 h-4" /> Secure Razorpay Checkout
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <ComparisonTable highlightedPlan="elite" />
        </div>
    );
};

export default ElitePage;
