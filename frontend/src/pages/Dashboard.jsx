import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { User, Mail, Crown, Calendar, Shield, ArrowRight } from 'lucide-react';
import { getProfile, setAuthToken, syncUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getToken();
                setAuthToken(token);

                // Sync user first (in case of first login)
                await syncUser({
                    clerkId: user.id,
                    name: user.fullName || user.firstName || 'User',
                    email: user.primaryEmailAddress?.emailAddress,
                });

                const { data } = await getProfile();
                setProfile(data.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchProfile();
    }, [user, getToken]);

    const planConfig = {
        basic: { label: 'Basic', color: 'bg-slate-100 text-slate-700', icon: Shield },
        elite: { label: 'Elite', color: 'bg-indigo-100 text-indigo-700', icon: Crown },
        premium: { label: 'Premium', color: 'bg-amber-100 text-amber-700', icon: Crown },
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const currentPlan = planConfig[profile?.plan || 'basic'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                        Welcome back,{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {user?.firstName || 'User'}
                        </span>
                        ! 👋
                    </h1>
                    <p className="text-slate-500">Manage your account and subscription.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6"
                    >
                        <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-500" />
                            Profile
                        </h2>

                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={user?.imageUrl}
                                alt="Profile"
                                className="w-16 h-16 rounded-full border-2 border-indigo-100"
                            />
                            <div>
                                <p className="text-lg font-semibold text-slate-900">
                                    {user?.fullName || user?.firstName}
                                </p>
                                <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user?.primaryEmailAddress?.emailAddress}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Member Since</span>
                                <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {profile?.createdAt
                                        ? new Date(profile.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })
                                        : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-slate-500">Clerk ID</span>
                                <span className="text-xs font-mono text-slate-400 truncate max-w-[180px]">
                                    {profile?.clerkId || '—'}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Plan Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col"
                    >
                        <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <Crown className="w-5 h-5 text-amber-500" />
                            Your Plan
                        </h2>

                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${currentPlan.color}`}>
                                    {currentPlan.label}
                                </div>
                            </div>

                            <p className="text-sm text-slate-500 mb-6">
                                {profile?.plan === 'basic'
                                    ? 'Upgrade to Elite or Premium to unlock advanced features like personalized counselling and seat prediction.'
                                    : profile?.plan === 'elite'
                                        ? 'You have access to advanced tools. Upgrade to Premium for 1-on-1 expert counselling.'
                                        : 'You have full access to all features including 1-on-1 expert counselling.'}
                            </p>
                        </div>

                        {profile?.plan === 'basic' || profile?.plan === 'elite' ? (
                            <button
                                onClick={() => navigate('/pricing')}
                                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Upgrade Plan <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <div className="w-full py-3 px-6 bg-green-50 text-green-700 rounded-xl font-semibold text-sm text-center border border-green-200">
                                ✅ Full Access Active
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {[
                        { label: 'Rank Predictor', path: '/rank-predictor', emoji: '📊' },
                        { label: 'Our Services', path: '/services', emoji: '🎯' },
                        { label: 'Pricing Plans', path: '/pricing', emoji: '💎' },
                    ].map((link) => (
                        <button
                            key={link.path}
                            onClick={() => navigate(link.path)}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all duration-300 text-left"
                        >
                            <span className="text-2xl">{link.emoji}</span>
                            <span className="text-sm font-medium text-slate-700">{link.label}</span>
                            <ArrowRight className="w-4 h-4 ml-auto text-slate-400" />
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
