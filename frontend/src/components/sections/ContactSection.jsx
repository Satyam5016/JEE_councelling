import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, PhoneCall, MapPin, Send, Loader2 } from 'lucide-react';
import { submitContact } from '../../utils/api';
import toast from 'react-hot-toast';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Name is required';
        if (!formData.email.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
        if (!formData.phone.trim()) return 'Phone number is required';
        if (formData.phone.length < 10) return 'Valid phone number is required';
        if (!formData.message.trim()) return 'Message is required';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(true);
        try {
            const { data } = await submitContact(formData);
            if (data.success) {
                toast.success('Message sent! We will get back to you soon.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            }
        } catch (error) {
            console.error('Contact submit error:', error);
            const errorMsg = error.response?.data?.message || 'Failed to send message. Please try again.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#F8FAFC]">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">Contact Us</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Have questions? We're here to help you make the right decision for your future
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Form Card (Left) */}
                    <div className="w-full lg:w-7/12 bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
                        <h3 className="text-3xl font-bold text-slate-800 mb-2">Send us a Message</h3>
                        <p className="text-slate-500 mb-8">We'll respond within 24 hours</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User size={20} className="text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-slate-700"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-slate-700"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone size={20} className="text-slate-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your Phone Number"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-slate-700"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute top-4 left-4 pointer-events-none">
                                    <MessageSquare size={20} className="text-slate-400" />
                                </div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message..."
                                    rows="4"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-slate-700 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-brand-orange hover:bg-[#F4511E] disabled:bg-slate-400 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-[0_8px_20px_-6px_rgba(255,87,34,0.6)] flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        Sending... <Loader2 className="animate-spin" size={20} />
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Details Cards (Right) */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6">

                        {/* Call Us Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <PhoneCall size={26} className="text-purple-600" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">Call Us</h4>
                            <p className="text-brand-orange font-bold text-xl tracking-wide mb-1">+91 98765 43210</p>
                            <p className="text-slate-500 text-sm">Mon-Sat, 9AM-7PM</p>
                        </div>

                        {/* Email Us Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Mail size={26} className="text-brand-orange" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">Email Us</h4>
                            <p className="text-[#1E3A8A] font-bold text-xl tracking-wide w-full truncate mb-1">hello@jeccounseling.com</p>
                            <p className="text-slate-500 text-sm">We reply within 24 hours</p>
                        </div>

                        {/* Visit Us Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapPin size={26} className="text-blue-600" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">Visit Us</h4>
                            <p className="text-slate-600 font-medium leading-relaxed mb-1">
                                4th Floor, Tech Park,<br />Sector 62, Noida, 201309
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
