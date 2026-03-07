import { BrainCircuit, Users, Video, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
    const services = [
        {
            icon: <BrainCircuit size={36} className="text-white" />,
            iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
            title: "AI Rank Predictor",
            description: "Get accurate college predictions based on your JEE rank using our advanced AI algorithm. Analyze thousands of data points to find your best match."
        },
        {
            icon: <Users size={36} className="text-white" />,
            iconBg: "bg-gradient-to-br from-orange-400 to-brand-orange",
            title: "1-on-[1] Counseling",
            description: "Personalized guidance from IIT alumni and expert counselors. Get tailored advice for college selection, branch choice, and career planning."
        },
        {
            icon: <Video size={36} className="text-white" />,
            iconBg: "bg-gradient-to-br from-emerald-400 to-green-600",
            title: "Video Library",
            description: "Access comprehensive video content covering JEE strategy, college reviews, cutoff analysis, and insider tips from successful students."
        }
    ];

    return (
        <section id="services" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">Our Services</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-6 tracking-tight">
                        Complete Counseling Solutions
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Everything you need to make the right college choice and secure your dream admission
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.12)] group"
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${service.iconBg} shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                {service.description}
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-[#F4511E] transition-colors">
                                Learn More <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
