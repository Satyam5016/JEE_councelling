import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useClerk, useAuth } from '@clerk/clerk-react';
import { getProfile, setAuthToken } from '../utils/api';
import BookingModal from './modals/BookingModal';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const { openSignIn } = useClerk();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await getToken();
            if (token) {
                setAuthToken(token);
            }
            const { data } = await getProfile();
            setUserProfile(data.data);
            return data.data;
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            return null;
        }
    };

    const handleBookClick = async () => {
        if (!isLoaded) return;

        if (!user) {
            openSignIn({ mode: 'modal' });
            return;
        }

        const profile = await fetchProfile();
        if (!profile) {
            toast.error('Failed to verify your plan. Please try again.');
            return;
        }

        if (profile.plan === 'free' || profile.plan === 'basic') {
            toast('Please upgrade to Elite or Premium for 1-on-1 sessions', { icon: '🚀' });
            navigate('/packages/premium');
        } else {
            setIsBookingModalOpen(true);
        }
    };

    const isDarkBg = !isScrolled && location.pathname === '/';

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Rank Predictor', path: '/rank-predictor' },
        { name: 'Services', path: '/services' },
        { name: 'Videos', path: '/videos' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-0.5 font-bold tracking-tighter text-4xl">
                    <span className="text-[#3b82f6]">j</span>
                    <span className="text-brand-orange">e</span>
                    <span className="text-[#3b82f6]">c</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 font-semibold text-[15px]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={(e) => {
                                if (link.path.startsWith('/#') && location.pathname === '/') {
                                    e.preventDefault();
                                    const id = link.path.replace('/#', '');
                                    const element = document.getElementById(id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }}
                            className={`transition-colors flex items-center h-full hover:text-brand-orange ${link.name === 'Home' && location.pathname === '/'
                                ? 'text-brand-orange'
                                : isDarkBg ? 'text-white/90' : 'text-slate-800'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth & CTAs */}
                <div className="hidden md:flex items-center space-x-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className={`px-6 py-2.5 rounded-full border-2 border-brand-orange text-brand-orange font-semibold transition-all hover:bg-brand-orange hover:text-white cursor-pointer`}>
                                Login
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <button
                        onClick={handleBookClick}
                        className="px-6 py-2.5 rounded-full bg-brand-orange text-white font-semibold shadow-lg shadow-brand-orange/25 transition-all hover:bg-[#F4511E] hover:scale-105"
                    >
                        Book Counseling
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 z-50 cursor-pointer text-brand-orange"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X size={32} />
                    ) : (
                        <Menu size={32} className={isDarkBg ? 'text-white' : 'text-slate-800'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full bg-white h-screen flex flex-col pt-24 px-6 z-40">
                    <div className="flex flex-col space-y-6 text-xl font-semibold">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-slate-800 hover:text-brand-orange"
                                onClick={(e) => {
                                    setIsMobileMenuOpen(false);
                                    if (link.path.startsWith('/#') && location.pathname === '/') {
                                        e.preventDefault();
                                        const id = link.path.replace('/#', '');
                                        const element = document.getElementById(id);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col w-full space-y-4 mt-8 pt-8 border-t border-slate-100">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="w-full py-4 rounded-full border-2 border-brand-orange text-brand-orange font-bold text-lg cursor-pointer">Login</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex justify-center py-2">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleBookClick();
                            }}
                            className="w-full py-4 rounded-full bg-brand-orange text-white font-bold text-lg shadow-md"
                        >
                            Book Counseling
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                userProfile={userProfile}
            />
        </nav>
    );
};

export default Navbar;
