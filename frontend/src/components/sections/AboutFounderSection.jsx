const AboutFounderSection = () => {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Column - Image */}
                    <div className="w-full lg:w-5/12 relative">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                                alt="Dr. Rajesh Kumar"
                                className="w-full h-auto object-cover object-center"
                            />
                        </div>

                        {/* Orange Experience Badge */}
                        <div className="absolute -bottom-8 -right-8 bg-brand-orange text-white rounded-[32px] p-8 shadow-xl z-20 hidden md:block w-48 text-center">
                            <p className="text-5xl font-bold mb-1">15+</p>
                            <p className="text-sm font-semibold uppercase tracking-wider">Years<br />Experience</p>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute -top-6 -left-6 w-full h-full border-2 border-slate-100 rounded-[40px] z-0 hidden md:block"></div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center">
                        <p className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">About the Founder</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-2">
                            Dr. Rajesh Kumar
                        </h2>
                        <h3 className="text-xl text-slate-600 font-medium mb-8 pb-8 border-b border-slate-200">
                            IIT Delhi Alumni | 15+ Years in Education
                        </h3>

                        <div className="text-slate-600 space-y-6 text-lg leading-relaxed mb-10">
                            <p>
                                With over 15 years of experience in JEE counseling and education, I have helped thousands of students achieve their dream of studying at premier institutions like IITs, NITs, and IIITs.
                            </p>
                            <p>
                                As an IIT Delhi alumnus myself, I understand the challenges students face during the admission process. My mission is to provide personalized guidance that goes beyond just rank predictions - I help students make informed decisions about their future.
                            </p>
                            <p>
                                Our team of expert counselors and mentors work tirelessly to ensure every student gets the support they need to succeed. We combine data-driven insights with personal mentorship to deliver results.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center sm:text-left shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-4xl font-bold text-[#1E3A8A] mb-2 tracking-tight">2000+</p>
                                <p className="text-slate-600 font-medium">Students Mentored</p>
                            </div>
                            <div className="flex-1 bg-orange-50 rounded-2xl p-6 border border-orange-100 text-center sm:text-left shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-4xl font-bold text-[#1E3A8A] mb-2 tracking-tight">98%</p>
                                <p className="text-slate-600 font-medium">Success Rate</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFounderSection;
