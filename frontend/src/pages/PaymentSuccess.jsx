import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const plan = searchParams.get('plan') || 'elite';

    useEffect(() => {
        const timer = setTimeout(() => navigate('/dashboard'), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-10 text-center flex flex-col items-center"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
                <p className="text-slate-600 mb-8">
                    Congratulations! You are now on the <span className="font-bold text-indigo-600 uppercase">{plan}</span> plan. Your JEE counselling journey just got a major boost.
                </p>

                <div className="bg-slate-50 w-full rounded-2xl p-6 text-left mb-8 border border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Next Steps</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                            Plan Activated Instantly
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                            Email Confirmation Sent
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-[10px] font-bold">
                                3
                            </div>
                            Access all Premium Features from Dashboard
                        </li>
                    </ul>
                </div>

                <div className="space-y-4 w-full">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                        Go to Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-slate-400">
                        Redirecting to dashboard in 5 seconds...
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
