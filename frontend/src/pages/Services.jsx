import { CheckCircle2, XCircle, ChevronRight, FileText, CalendarCheck, BookOpen, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { createOrder, verifyPayment, setAuthToken, syncUser } from '../utils/api';

const Services = () => {
    const { getToken, isSignedIn } = useAuth();
    const { user } = useUser();

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (plan) => {
        if (!isSignedIn) {
            toast.error('Please login to purchase a package');
            return;
        }

        const resScript = await loadRazorpay();
        if (!resScript || !window.Razorpay) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const token = await getToken();
            setAuthToken(token);

            // Auto-sync user to backend ensure they exist in DB
            if (user) {
                await syncUser({
                    clerkId: user.id,
                    name: user.fullName || user.firstName || 'User',
                    email: user.primaryEmailAddress?.emailAddress,
                });
            }

            const { data } = await createOrder(plan);

            if (!data.success) {
                toast.error(data.message || 'Failed to create order');
                return;
            }

            const { orderId, amount, currency, keyId } = data.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: 'JEE Counselling',
                description: `Payment for ${plan} package`,
                order_id: orderId,
                handler: async (response) => {
                    console.log('[Services] Razorpay handler triggered with:', response);
                    try {
                        console.log('[Services] Getting fresh token...');
                        const currentToken = await getToken();
                        console.log('[Services] Token obtained:', currentToken ? 'yes' : 'NO TOKEN');
                        setAuthToken(currentToken);

                        console.log('[Services] Calling verifyPayment API...');
                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        console.log('[Services] Verify response:', verifyRes.data);

                        if (verifyRes.data.success) {
                            toast.success('Payment successful! Your plan has been updated.');
                            window.location.href = '/dashboard';
                        } else {
                            toast.error(verifyRes.data.message || 'Verification failed.');
                        }
                    } catch (err) {
                        console.error('[Services] Verification error:', err);
                        console.error('[Services] Error response:', err.response?.data);
                        toast.error('Payment verification failed. Please contact support.');
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 3000);
                    }
                },
                modal: {
                    ondismiss: () => {
                        console.log('[Services] Razorpay modal dismissed.');
                    },
                },
                prefill: {
                    name: user?.fullName || '',
                    email: user?.primaryEmailAddress?.emailAddress || '',
                },
                theme: {
                    color: '#FF5722',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                console.error('[Services] ❌ PAYMENT FAILED:', response.error);
                console.error('[Services] Error Code:', response.error.code);
                console.error('[Services] Error Description:', response.error.description);
                console.error('[Services] Error Reason:', response.error.reason);
                toast.error(`Payment failed: ${response.error.description}`);
            });
            paymentObject.open();

        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.response?.data?.message || 'Error processing payment');
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] pt-32 pb-24 flex flex-col items-center">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Breadcrumbs */}
                <div className="flex justify-center items-center gap-2 text-sm font-medium mb-12">
                    <Link to="/" className="text-slate-500 hover:text-brand-orange transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <span className="text-brand-orange">Services</span>
                </div>

                {/* Header Text */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#1E3A8A] tracking-tight mb-6">
                        Counseling Packages
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
                        Personalized guidance to help you make the right college choice. Choose the plan that fits your needs and secure your dream admission.
                    </p>
                    <p className="text-slate-500 font-medium">All packages include expert mentorship from IIT alumni</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

                    {/* Basic Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col pt-12">
                        <h3 className="text-2xl font-bold text-center text-slate-800 mb-4">Basic</h3>
                        <div className="flex items-baseline justify-center gap-1 mb-4">
                            <span className="text-5xl font-extrabold text-[#1E3A8A]">₹1</span>
                            <span className="text-slate-500 font-medium">/session</span>
                        </div>
                        <p className="text-center text-slate-600 text-sm mb-8 px-4">Perfect for students who need quick guidance</p>

                        <ul className="space-y-5 mb-10 flex-1">
                            {[
                                { text: "Single counseling session (1 hour)", active: true },
                                { text: "AI rank predictor access", active: true },
                                { text: "College list based on rank", active: true },
                                { text: "Branch selection guidance", active: true },
                                { text: "Email support for 7 days", active: true },
                                { text: "Follow-up sessions", active: false },
                                { text: "Document verification help", active: false },
                                { text: "Priority support", active: false },
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    {feature.active ? (
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle size={20} className="text-slate-300 shrink-0 mt-0.5" />
                                    )}
                                    <span className={feature.active ? "text-slate-700 font-medium" : "text-slate-400"}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/packages/basic"
                            className="w-full py-4 rounded-xl border-2 border-brand-orange text-brand-orange font-bold text-lg hover:bg-orange-50 transition-colors cursor-pointer flex items-center justify-center"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Premium Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_-20px_rgba(255,87,34,0.3)] border-2 border-brand-orange flex flex-col relative transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px bg-brand-orange text-white px-6 py-2 rounded-b-xl font-bold text-sm tracking-wide">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-bold text-center text-slate-800 mb-4 mt-6">Premium</h3>
                        <div className="flex items-baseline justify-center gap-1 mb-4">
                            <span className="text-5xl font-extrabold text-[#1E3A8A]">₹499</span>
                            <span className="text-slate-500 font-medium">/package</span>
                        </div>
                        <p className="text-center text-slate-600 text-sm mb-8 px-4">Most popular choice for comprehensive guidance</p>

                        <ul className="space-y-5 mb-10 flex-1">
                            {[
                                { text: "Three counseling sessions", active: true },
                                { text: "AI rank predictor access", active: true },
                                { text: "Detailed college analysis", active: true },
                                { text: "Branch selection guidance", active: true },
                                { text: "Email & WhatsApp support", active: true },
                                { text: "Two follow-up sessions", active: true },
                                { text: "Document verification help", active: true },
                                { text: "Priority support", active: false },
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    {feature.active ? (
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle size={20} className="text-slate-300 shrink-0 mt-0.5" />
                                    )}
                                    <span className={feature.active ? "text-slate-700 font-medium" : "text-slate-400"}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/packages/premium"
                            className="w-full py-4 rounded-xl bg-brand-orange text-white font-bold text-lg hover:bg-[#F4511E] shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center"
                        >
                            Most Popular
                        </Link>
                    </div>

                    {/* Elite Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col pt-12">
                        <h3 className="text-2xl font-bold text-center text-slate-800 mb-4">Elite</h3>
                        <div className="flex items-baseline justify-center gap-1 mb-4">
                            <span className="text-5xl font-extrabold text-[#1E3A8A]">₹999</span>
                            <span className="text-slate-500 font-medium">/package</span>
                        </div>
                        <p className="text-center text-slate-600 text-sm mb-8 px-4">Complete end-to-end admission support</p>

                        <ul className="space-y-5 mb-10 flex-1">
                            {[
                                { text: "Unlimited counseling sessions", active: true },
                                { text: "AI rank predictor access", active: true },
                                { text: "Detailed college analysis", active: true },
                                { text: "Branch selection guidance", active: true },
                                { text: "24/7 support (all channels)", active: true },
                                { text: "Unlimited follow-up sessions", active: true },
                                { text: "Complete document assistance", active: true },
                                { text: "Dedicated mentor assigned", active: true },
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    {feature.active ? (
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle size={20} className="text-slate-300 shrink-0 mt-0.5" />
                                    )}
                                    <span className={feature.active ? "text-slate-700 font-medium" : "text-slate-400"}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/packages/elite"
                            className="w-full py-4 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center"
                        >
                            Go Premium
                        </Link>
                    </div>

                </div>

                {/* Compare Features Link */}
                <div className="text-center mb-24">
                    <button className="inline-flex items-center gap-2 text-brand-orange font-bold hover:text-[#E64A19] transition-colors group">
                        Compare All Features
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Additional Services */}
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#1E3A8A] tracking-tight mb-4">Additional Services</h2>
                        <p className="text-slate-600 text-lg">Enhance your counseling experience with these add-ons</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <FileText size={28} className="text-[#3b82f6]" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Document Verification</h4>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Complete document checking and verification support</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-bold text-brand-orange">₹1,999</span>
                                <button
                                    onClick={() => handlePayment('doc_verif')}
                                    className="px-4 py-2 border-2 border-brand-orange text-brand-orange font-bold text-sm rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                                <CalendarCheck size={28} className="text-purple-500" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Admission Assistance</h4>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Help with admission forms and deadlines</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-bold text-brand-orange">₹2,499</span>
                                <button
                                    onClick={() => handlePayment('admission')}
                                    className="px-4 py-2 border-2 border-brand-orange text-brand-orange font-bold text-sm rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                                <BookOpen size={28} className="text-brand-orange" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Branch Counseling</h4>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Detailed branch selection and career guidance</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-bold text-brand-orange">₹1,499</span>
                                <button
                                    onClick={() => handlePayment('branch')}
                                    className="px-4 py-2 border-2 border-brand-orange text-brand-orange font-bold text-sm rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                                <HomeIcon size={28} className="text-green-500" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Hostel & Accommodation</h4>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Guidance on hostel facilities and accommodation</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-bold text-brand-orange">₹999</span>
                                <button
                                    onClick={() => handlePayment('hostel')}
                                    className="px-4 py-2 border-2 border-brand-orange text-brand-orange font-bold text-sm rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;
