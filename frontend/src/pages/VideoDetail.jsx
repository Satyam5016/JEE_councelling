import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Lock,
    ShieldCheck,
    Crown,
    Clock,
    Calendar,
    ArrowLeft,
    Share2,
    ThumbsUp,
    ChevronRight,
    Sparkles,
    Loader2,
    ArrowRight
} from 'lucide-react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { getVideoById, getVideos, getProfile, setAuthToken } from '../utils/api';
import toast from 'react-hot-toast';

const VideoDetail = () => {
    const { videoId } = useParams();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [userPlan, setUserPlan] = useState('basic');
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (videoId) {
            console.log('VideoDetail: Fetching data for ID:', videoId);
            fetchVideoData();
        }
    }, [videoId]);

    useEffect(() => {
        if (isLoaded && user) {
            console.log('VideoDetail: User loaded, syncing auth...');
            fetchUserPlan();
        } else if (isLoaded && !user) {
            console.log('VideoDetail: Guest user detected.');
            setUserPlan('basic');
        }
    }, [isLoaded, user]);

    useEffect(() => {
        if (video) {
            checkAccess();
        }
    }, [video, userPlan]);

    const fetchUserPlan = async () => {
        try {
            const token = await getToken();
            if (token) setAuthToken(token);

            const response = await getProfile();
            if (response.data && response.data.success && response.data.data) {
                console.log('VideoDetail: User plan fetched:', response.data.data.plan);
                setUserPlan(response.data.data.plan);
            }
        } catch (err) {
            console.error('VideoDetail: Error fetching user plan:', err);
            setUserPlan('basic');
        }
    };

    const fetchVideoData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [vidRes, allVidsRes] = await Promise.all([
                getVideoById(videoId).catch(e => ({ error: e })),
                getVideos({}).catch(e => ({ error: e }))
            ]);

            if (vidRes.error) throw vidRes.error;

            if (vidRes.data && vidRes.data.success && vidRes.data.data) {
                console.log('VideoDetail: Video data loaded:', vidRes.data.data.title);
                setVideo(vidRes.data.data);
            } else {
                throw new Error('Video not found');
            }

            if (allVidsRes.data && allVidsRes.data.success && Array.isArray(allVidsRes.data.data)) {
                setRelatedVideos(
                    allVidsRes.data.data
                        .filter(v => v._id !== videoId)
                        .slice(0, 4)
                );
            }
        } catch (err) {
            console.error('VideoDetail: Error loading data:', err);
            setError(err.message || 'Failed to load video');
            toast.error('Could not load video details');
        } finally {
            setLoading(false);
        }
    };

    const checkAccess = () => {
        if (!video) return;
        const planLevels = { basic: 0, elite: 1, premium: 2 };
        const userLevel = planLevels[userPlan] || 0;
        const requiredLevel = planLevels[video.accessLevel] || 0;

        console.log(`VideoDetail: Plan Check - Required: ${video.accessLevel} (${requiredLevel}), User: ${userPlan} (${userLevel})`);
        setHasAccess(userLevel >= requiredLevel);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white pt-20">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Loading session...</p>
                </div>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white pt-20 px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
                    <p className="text-slate-500 mb-8">{error || "We couldn't find the video you're looking for."}</p>
                    <Link to="/videos" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Videos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/videos" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Video Hub
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {/* Player Container */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-100 shadow-2xl mb-8">
                            {hasAccess ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-3xl">
                                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
                                        <Lock className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Content Locked</h2>
                                    <p className="text-indigo-100/70 mb-8 max-w-xs text-center">
                                        This {video.accessLevel} video requires an active plan subscription.
                                    </p>
                                    <Link
                                        to="/pricing"
                                        className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all flex items-center gap-2"
                                    >
                                        Upgrade Now <Sparkles className="w-4 h-4 fill-white" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                    {video.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                    <Clock className="w-4 h-4" /> {video.duration}
                                </div>
                                {video.accessLevel !== 'basic' && (
                                    <span className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                        {video.accessLevel === 'elite' ? <ShieldCheck className="w-3 h-3" /> : <Crown className="w-3 h-3" />}
                                        {video.accessLevel}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-6">{video.title}</h1>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {video.description}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">More Strategies</h3>
                        <div className="space-y-6">
                            {relatedVideos.map(rv => (
                                <Link key={rv._id} to={`/videos/${rv._id}`} className="flex gap-4 group">
                                    <div className="relative w-28 aspect-video rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                        <img src={`https://img.youtube.com/vi/${rv.youtubeId}/mqdefault.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        {rv.accessLevel !== 'basic' && (
                                            <div className="absolute top-1 right-1 p-0.5 bg-black/50 backdrop-blur-sm rounded-md border border-white/10">
                                                {rv.accessLevel === 'elite' ? <ShieldCheck className="w-3 h-3 text-indigo-400" /> : <Crown className="w-3 h-3 text-amber-400" />}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{rv.title}</h4>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{rv.category}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
export default VideoDetail;
