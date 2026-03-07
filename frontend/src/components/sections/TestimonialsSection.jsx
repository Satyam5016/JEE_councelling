import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rahul Sharma",
            rank: "AIR 247",
            college: "IIT Bombay CSE",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
            quote: "The counseling sessions were incredibly helpful. The mentors guided me through every step of the college selection process. Their AI rank predictor was spot-on, and I got admitted to IIT Bombay CSE with AIR 247. I highly recommend their services to all JEE aspirants."
        },
        {
            id: 2,
            name: "Sneha Patel",
            rank: "AIR 1052",
            college: "IIT Delhi EE",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
            quote: "Choosing the right branch was my biggest worry. The 1-on-1 mentorship cleared all my doubts. They explained the curriculum and placement stats realistically. I am thrilled to be at IIT Delhi now, all thanks to JEC counseling!"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="py-24 bg-[#1E3A8A] text-white relative">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">Success Stories</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        What Our Students Say
                    </h2>
                    <p className="text-blue-100/80 text-lg">
                        Real stories from students who achieved their IIT dreams with our guidance
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
                        {/* Image Column */}
                        <div className="md:w-2/5 relative h-80 md:h-auto">
                            <img
                                src={currentTestimonial.image}
                                alt={currentTestimonial.name}
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute top-6 left-6 flex gap-1 bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-[#FFB800] text-[#FFB800]" />
                                ))}
                            </div>
                            <button
                                onClick={handlePrev}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 text-slate-800 rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors shadow-lg"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        {/* Content Column */}
                        <div className="md:w-3/5 p-10 md:p-14 lg:p-20 flex flex-col justify-center bg-white relative">
                            <Quote size={64} className="text-[#E2E8F0] absolute top-10 right-10 opacity-50" />

                            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 relative z-10">
                                {currentTestimonial.quote}
                            </p>

                            <div>
                                <h4 className="text-2xl font-bold text-[#0B1A2F] mb-2">{currentTestimonial.name}</h4>
                                <p className="text-brand-orange font-semibold tracking-wide">
                                    {currentTestimonial.rank} | {currentTestimonial.college}
                                </p>
                            </div>

                            <button
                                onClick={handleNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 text-slate-800 rounded-full border border-slate-100 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors shadow-lg md:right-[-24px] z-20"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10 gap-3">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? 'bg-brand-orange w-8' : 'bg-white/30 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
