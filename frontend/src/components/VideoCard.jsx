import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Lock, ShieldCheck, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
    const { _id, title, youtubeId, category, duration, accessLevel } = video;

    const getAccessIcon = () => {
        if (accessLevel === 'elite') return <ShieldCheck className="w-4 h-4 text-indigo-500" />;
        if (accessLevel === 'premium') return <Crown className="w-4 h-4 text-amber-500" />;
        return null;
    };

    const getAccessBadgeStyle = () => {
        if (accessLevel === 'elite') return 'bg-indigo-50 text-indigo-700 border-indigo-100';
        if (accessLevel === 'premium') return 'bg-amber-50 text-amber-700 border-amber-100';
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video">
                <img
                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {duration}
                </div>

                {/* Access Overlay if not basic */}
                {accessLevel !== 'basic' && (
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-slate-100">
                        {accessLevel === 'elite' ? <ShieldCheck className="w-4 h-4 text-indigo-600" /> : <Crown className="w-4 h-4 text-amber-600" />}
                    </div>
                )}

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 text-indigo-600 fill-indigo-600" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getAccessBadgeStyle()}`}>
                        {category}
                    </span>
                    {accessLevel !== 'basic' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                            <Lock className="w-2.5 h-2.5" />
                            {accessLevel}
                        </div>
                    )}
                </div>

                <h3 className="text-slate-800 font-semibold mb-2 line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 transition-colors">
                    {title}
                </h3>

                <Link
                    to={`/videos/${_id}`}
                    className="w-full py-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-600 hover:text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all border border-slate-100 hover:border-indigo-600"
                >
                    <Play className="w-4 h-4" />
                    Watch Now
                </Link>
            </div>
        </motion.div>
    );
};

export default VideoCard;
