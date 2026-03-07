import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#1a237e] text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-0.5 font-bold tracking-tighter text-4xl mb-6">
                            <span className="text-[#3b82f6]">j</span>
                            <span className="text-brand-orange">e</span>
                            <span className="text-[#3b82f6]">c</span>
                        </div>
                        <p className="text-blue-200 text-sm leading-relaxed mb-8 max-w-xs">
                            Your trusted partner for IIT, NIT, and IIIT admissions. Expert guidance to help you achieve your dream college.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-blue-200">
                            <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
                            <li><Link to="/rank-predictor" className="hover:text-brand-orange transition-colors">Rank Predictor</Link></li>
                            <li><Link to="/services" className="hover:text-brand-orange transition-colors">Services</Link></li>
                            <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-blue-200">
                            <li><a href="#" className="hover:text-brand-orange transition-colors">College Counseling</a></li>
                            <li><a href="#" className="hover:text-brand-orange transition-colors">Rank Prediction</a></li>
                            <li><a href="#" className="hover:text-brand-orange transition-colors">Branch Selection</a></li>
                            <li><a href="#" className="hover:text-brand-orange transition-colors">1-on-1 Mentorship</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-blue-200">
                            <li className="flex gap-3">
                                <Phone size={18} className="text-brand-orange shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-white">+91 98765 43210</p>
                                    <p className="text-xs text-blue-300">Mon-Sat, 9AM-7PM</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={18} className="text-brand-orange shrink-0 mt-0.5" />
                                <p className="font-medium text-white break-all">info@jeecounseling.com</p>
                            </li>
                            <li className="flex gap-3">
                                <MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" />
                                <p className="leading-relaxed text-white text-sm">New Delhi, India</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-blue-300 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} JEC Counseling. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-blue-300">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
