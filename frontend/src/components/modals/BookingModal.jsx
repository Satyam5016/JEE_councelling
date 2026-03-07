import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, Trophy, MapPin, BookOpen, Send, Loader2 } from 'lucide-react';
import { bookCounselling } from '../../utils/api';
import toast from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, userProfile }) => {
    const [formData, setFormData] = useState({
        name: userProfile?.name || '',
        email: userProfile?.email || '',
        phone: '',
        rank: '',
        category: 'General',
        branch: '',
        state: '',
        date: '',
        time: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setFormData(prev => ({
                ...prev,
                name: userProfile.name || prev.name,
                email: userProfile.email || prev.email
            }));
        }
    }, [userProfile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        const required = ['name', 'email', 'phone', 'rank', 'date', 'time'];
        for (const field of required) {
            if (!formData[field]) {
                toast.error(`Please fill the ${field} field`);
                return;
            }
        }

        setLoading(true);
        try {
            const { data } = await bookCounselling(formData);
            if (data.success) {
                toast.success('Counselling session booked! Check your email.');
                onClose();
            }
        } catch (error) {
            console.error('Booking Error:', error);
            toast.error(error.response?.data?.message || 'Failed to book session. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl relative"
                >
                    {/* Header */}
                    <div className="bg-[#1E3A8A] p-8 text-white relative">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-2">Book Your Expert Session</h2>
                        <p className="text-blue-100/80">Schedule a 1-on-1 session with our senior counsellors.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="relative md:col-span-2">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="WhatsApp Number"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Academic Info */}
                            <div className="space-y-4 md:col-span-2 pt-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Counselling Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Trophy size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="rank"
                                            value={formData.rank}
                                            onChange={handleChange}
                                            placeholder="JEE Main/Adv Rank"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all appearance-none"
                                        >
                                            <option value="General">General</option>
                                            <option value="OBC-NCL">OBC-NCL</option>
                                            <option value="SC">SC</option>
                                            <option value="ST">ST</option>
                                            <option value="EWS">EWS</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BookOpen size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            placeholder="Preferred Branch"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Home State"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="space-y-4 md:col-span-2 pt-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Preferred Schedule</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar size={18} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Clock size={18} className="text-slate-400" />
                                        </div>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all appearance-none"
                                            required
                                        >
                                            <option value="">Select Time Slot</option>
                                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                                            <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                                            <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                                            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                                            <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-brand-orange hover:bg-[#F4511E] text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-2 group disabled:bg-slate-300 disabled:shadow-none"
                            >
                                {loading ? (
                                    <>
                                        Processing... <Loader2 size={24} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Confirm Booking <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </>
                                )}
                            </button>
                            <p className="text-center text-slate-400 text-xs mt-4">
                                By confirming, you agree to our terms of premium 1-on-1 mentorship.
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
