import { PlayCircle, Eye, Clock, ExternalLink } from 'lucide-react';

const VideoLibrarySection = () => {
    const videos = [
        {
            thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
            duration: "18:45",
            title: "Complete JEE Strategy 2024 - How to Crack IIT",
            views: "125K",
            time: "2 weeks ago"
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
            duration: "22:30",
            title: "IIT Bombay Campus Tour & Branch Review",
            views: "89K",
            time: "1 month ago"
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000",
            duration: "15:20",
            title: "JEE Main Cutoff Analysis 2024 - All NITs",
            views: "156K",
            time: "3 weeks ago"
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000",
            duration: "25:15",
            title: "Branch Selection Guide - CSE vs ECE vs Mechanical",
            views: "203K",
            time: "1 week ago"
        }
    ];

    return (
        <section id="videos" className="py-24 bg-[#F8FAFC]">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <p className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">Video Library</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight">
                            Latest Strategy Videos
                        </h2>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-[#F4511E] transition-colors mt-6 md:mt-0 group">
                        View All on YouTube <ExternalLink size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1 group cursor-pointer">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">
                                    {video.title}
                                </h3>
                                <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5"><Eye size={16} /> {video.views}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={16} /> {video.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoLibrarySection;
