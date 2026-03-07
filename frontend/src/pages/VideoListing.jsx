import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Search, Filter, Play, ArrowRight, Loader2, Video as VideoIcon } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { getVideos, setAuthToken } from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = [
    'All',
    'Rank & Prediction',
    'College Reviews',
    'Counselling Strategy',
    'Branch Guidance',
    'Premium Strategy'
];

const VideoListing = () => {
    const { getToken } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        fetchVideos();
    }, [debouncedSearch, selectedCategory]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (token) setAuthToken(token);

            const response = await getVideos({
                category: selectedCategory,
                search: debouncedSearch
            });
            if (response.data.success) {
                setVideos(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            toast.error('Failed to load videos. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <Play className="w-3 h-3 fill-indigo-600" />
                            Premium Learning
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
                        >
                            JEE Counselling & <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Strategy Video Hub</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600 mb-10"
                        >
                            Master the JoSAA/CSAB counselling process with our exclusive video guides,
                            college reviews, and rank-based strategy masterclasses.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-2xl mx-auto"
                        >
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search for videos (e.g., 'JoSAA', 'NIT Review')..."
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm shadow-slate-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        <div className="flex items-center gap-2 px-3 py-2 text-slate-500 font-medium text-sm whitespace-nowrap border-r border-slate-200 mr-2">
                            <Filter className="w-4 h-4" />
                            Categories
                        </div>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                            <p className="text-slate-500 font-medium tracking-wide">Fetching videos...</p>
                        </div>
                    ) : videos.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4">
                                    {selectedCategory === 'All' ? 'Latest Videos' : selectedCategory}
                                    <span className="text-sm font-normal text-slate-500 ml-3">({videos.length} videos found)</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode='popLayout'>
                                    {videos.map((video) => (
                                        <VideoCard key={video._id} video={video} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <VideoIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No videos found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                We couldn't find any videos matching your search or filter. Try a different keyword or category.
                            </p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VideoListing;
