import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ComparisonTable = ({ highlightedPlan = 'elite' }) => {
    const features = [
        { name: 'Rank Prediction', basic: 'Limited', elite: 'Unlimited', premium: 'Unlimited' },
        { name: 'College List', basic: 'Top 20', elite: 'Full', premium: 'Full' },
        { name: 'Branch Probability', basic: false, elite: true, premium: true },
        { name: '1-on-1 Call', basic: false, elite: false, premium: true },
        { name: 'Priority Support', basic: false, elite: true, premium: true },
    ];

    const plans = ['basic', 'elite', 'premium'];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Compare Our Plans</h2>
                    <p className="text-slate-600">Choose the best fit for your JEE journey</p>
                </div>

                <div className="overflow-x-auto pt-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-6 px-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-900">Feature</th>
                                <th className={`py-6 px-4 border-b border-slate-200 text-center font-bold relative ${highlightedPlan === 'basic' ? 'bg-indigo-50/50' : 'bg-slate-50'}`}>
                                    Basic
                                </th>
                                <th className={`py-6 px-4 border-b border-slate-200 text-center font-bold relative ${highlightedPlan === 'elite' ? 'bg-indigo-50/50' : 'bg-slate-50'}`}>
                                    Elite
                                    {highlightedPlan === 'elite' && (
                                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-600/20 whitespace-nowrap z-10">Recommended</span>
                                    )}
                                </th>
                                <th className={`py-6 px-4 border-b border-slate-200 text-center font-bold relative ${highlightedPlan === 'premium' ? 'bg-indigo-50/50' : 'bg-slate-50'}`}>
                                    Premium
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <motion.tr
                                    key={feature.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <td className="py-4 px-4 border-b border-slate-100 font-medium text-slate-700">{feature.name}</td>
                                    {plans.map((plan) => (
                                        <td key={plan} className={`py-4 px-4 border-b border-slate-100 text-center ${highlightedPlan === plan ? 'bg-indigo-50/20' : ''}`}>
                                            {typeof feature[plan] === 'boolean' ? (
                                                feature[plan] ? (
                                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                                                )
                                            ) : (
                                                <span className={`text-sm ${plan === highlightedPlan ? 'font-semibold text-indigo-700' : 'text-slate-600'}`}>
                                                    {feature[plan]}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
