import { Award, Trophy, Clock, Building } from 'lucide-react';

const StatsStrip = () => {
    const stats = [
        {
            icon: <Award size={32} className="text-white" />,
            number: "2000+",
            label: "Students Placed"
        },
        {
            icon: <Trophy size={32} className="text-white" />,
            number: "98%",
            label: "Success Rate"
        },
        {
            icon: <Clock size={32} className="text-white" />,
            number: "15+",
            label: "Years Experience"
        },
        {
            icon: <Building size={32} className="text-white" />,
            number: "50+",
            label: "IITs & NITs"
        }
    ];

    return (
        <section className="py-20 bg-white relative -mt-10 rounded-t-[40px] z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center mb-6 shadow-lg shadow-brand-orange/30 transition-transform duration-300 group-hover:-translate-y-2">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-[#0B1A2F] mb-2 tracking-tight">
                                {stat.number}
                            </h3>
                            <p className="text-slate-600 font-medium text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
