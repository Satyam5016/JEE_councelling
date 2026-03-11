import { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight, Video, Map, PhoneCall, Users, ShieldCheck, Quote } from 'lucide-react';
import ComparisonTable from '../../components/ComparisonTable';
import { createOrder, verifyPayment, setAuthToken, syncUser } from '../../utils/api';

const PremiumPage = () => {
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleBook = async () => {
        if (!isSignedIn) {
            alert('Please sign in to book.');
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
            const { data } = await createOrder('premium');
            const orderData = data.data;

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'JEE Premium Counselling',
                description: 'Premium Plan Booking',
                order_id: orderData.orderId,
                handler: async (response) => {
                    console.log('[PremiumPage] Razorpay handler triggered with:', response);
                    try {
                        console.log('[PremiumPage] Getting fresh token...');
                        const currentToken = await getToken();
                        console.log('[PremiumPage] Token obtained:', currentToken ? 'yes' : 'NO TOKEN');
                        setAuthToken(currentToken);
                        console.log('[PremiumPage] Calling verifyPayment API...');
                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        console.log('[PremiumPage] Verify response:', verifyRes.data);
                        if (verifyRes.data.success) {
                            window.location.href = '/payment-success?plan=premium';
                        } else {
                            console.error('[PremiumPage] Verify returned success=false:', verifyRes.data);
                            alert('Verification failed: ' + (verifyRes.data.message || 'Unknown error'));
                        }
                    } catch (err) {
                        console.error('[PremiumPage] Verification failed:', err);
                        console.error('[PremiumPage] Error response:', err.response?.data);
                        alert('Payment verification failed.');
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 3000);
                    }
                },
                modal: {
                    ondismiss: () => {
                        console.log('[PremiumPage] Razorpay modal dismissed.');
                        setLoading(false);
                    },
                },
                prefill: {
                    name: user.fullName || '',
                    email: user.primaryEmailAddress?.emailAddress || '',
                },
                theme: { color: '#d97706' },
            };
            console.log('[PremiumPage] Opening Razorpay...');
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to initiate payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-24">
            {/* Hero Section */}
            <section className="bg-slate-950 py-24 px-4 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 bg-amber-500 text-slate-900 rounded-full text-xs font-bold mb-8 uppercase tracking-widest"
                    >
                        ⚡ Limited Seats Available
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
                    >
                        1-on-1 Expert Counselling & <br />
                        <span className="text-amber-500 uppercase">Strategic Planning</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-10"
                    >
                        The ultimate personalized experience. Direct access to experts who have guided thousands of students to their dream IITs and NITs.
                    </motion.p>
                    <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-70">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-amber-500" />
                            <span className="text-sm font-medium">500+ Students Guided</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-amber-500" />
                            <span className="text-sm font-medium">Certified Mentors</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exclusive Features */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Premium Advantage</h2>
                        <p className="text-slate-600">Everything in Elite PLUS exclusive personalized services</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {[
                            { icon: Video, title: '1-on-1 Video Session', text: '45-minute private consultation for personalized rank analysis.' },
                            { icon: Map, title: 'Personalized Roadmap', text: 'Step-by-step admission strategy tailored to your rank and preferences.' },
                            { icon: PhoneCall, title: 'JoSAA / CSAB Strategy', text: 'Live call during choice filling to optimize your college order.' },
                            { icon: Check, title: 'WhatsApp Priority', text: 'Dedicated mentor on WhatsApp for instant doubt resolution.' },
                            { icon: Users, title: 'Parent Guidance', text: 'Exclusive session to address concerns and explain the process to parents.' },
                            { icon: Crown, title: 'Lifetime Access', text: 'Unlimited access to all future updates and premium data tools.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                                    <item.icon className="w-7 h-7 text-amber-600 group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <div className="py-20 border-t border-slate-100">
                        <h3 className="text-center text-2xl font-bold text-slate-900 mb-12">What Our Premium Students Say</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { name: 'Rahul Sharma', college: 'IIT Bombay', text: 'The 1-on-1 session changed my entire strategy. I was confused between NIT Warangal and IIT Indore, but the mentor helped me see the long-term benefit.' },
                                { name: 'Ananya Iyer', college: 'NIT Trichy', text: 'Having a mentor on WhatsApp during the hectic JoSAA process was a lifesaver. No more panic during choice filling!' },
                            ].map((t, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-3xl relative">
                                    <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200" />
                                    <p className="italic text-slate-600 mb-6 relative z-10">"{t.text}"</p>
                                    <div>
                                        <p className="font-bold text-slate-900">{t.name}</p>
                                        <p className="text-sm text-amber-600 font-medium">{t.college}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="mt-24 max-w-2xl mx-auto">
                        <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-40 -mt-40"></div>
                            <h3 className="text-3xl font-bold mb-2">Premium Experience</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-8">
                                <span className="text-6xl font-extrabold text-amber-500">₹499</span>
                                <span className="text-slate-400">/one-time</span>
                            </div>
                            <button
                                onClick={handleBook}
                                disabled={loading}
                                className="w-full py-5 bg-amber-500 text-slate-950 rounded-2xl font-black text-lg hover:bg-amber-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mb-6 shadow-lg shadow-amber-500/20"
                            >
                                {loading ? 'Processing...' : 'BOOK PREMIUM COUNSELLING'}
                                <ArrowRight className="w-6 h-6" />
                            </button>
                            <p className="text-sm text-slate-400">Join 500+ successful students today</p>
                        </div>
                    </div>
                </div>
            </section>

            <ComparisonTable highlightedPlan="premium" />
        </div>
    );
};

export default PremiumPage;
