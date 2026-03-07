import { useState } from 'react';
import { CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const RankPredictor = () => {
    const [selectedCategory, setSelectedCategory] = useState("General");
    const [selectedBranches, setSelectedBranches] = useState([]);

    const categories = ["General", "OBC", "SC", "ST", "EWS"];
    const branches = ["CSE", "ECE", "Mechanical", "Civil", "Chemical", "Electrical"];

    const handleBranchToggle = (branch) => {
        if (selectedBranches.includes(branch)) {
            setSelectedBranches(selectedBranches.filter(b => b !== branch));
        } else {
            setSelectedBranches([...selectedBranches, branch]);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] pt-32 pb-24 flex flex-col items-center">
            <div className="container mx-auto px-6 max-w-4xl flex flex-col flex-1">

                {/* Breadcrumbs */}
                <div className="flex justify-center items-center gap-2 text-sm font-medium mb-12">
                    <Link to="/" className="text-slate-500 hover:text-brand-orange transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <span className="text-brand-orange">Rank Predictor</span>
                </div>

                {/* Header Text */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#1E3A8A] tracking-tight mb-6">
                        AI-Powered College Predictor
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                        Get accurate predictions for IIT, NIT, and IIIT admissions based on your JEE rank. Our advanced AI analyzes thousands of data points to find your perfect match.
                    </p>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-50 border border-green-200">
                        <CheckCircle2 size={18} className="text-green-600" />
                        <span className="text-sm font-bold text-green-700">Based on 2024 Cutoff Data</span>
                    </div>
                </div>

                {/* Predictor Form Card */}
                <div className="w-full bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-slate-100 flex-1 relative overflow-hidden">
                    {/* Top thick border accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E3A8A] via-blue-500 to-brand-orange"></div>

                    <form className="max-w-2xl mx-auto mt-4">
                        <div className="space-y-8">

                            {/* JEE Rank Input */}
                            <div>
                                <label className="block text-lg font-bold text-slate-800 mb-3">
                                    Enter Your JEE Rank <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Example: 2500"
                                    className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-orange/10 focus:border-brand-orange outline-none transition-all text-slate-800 text-lg font-semibold placeholder:text-slate-400 placeholder:font-normal"
                                />
                            </div>

                            {/* Select Category */}
                            <div>
                                <label className="block text-base font-bold text-slate-800 mb-4">
                                    Select Category <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${selectedCategory === category
                                                    ? 'bg-brand-orange text-white shadow-md'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Gender and Home State */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-bold text-slate-800 mb-3">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors appearance-none cursor-pointer font-medium">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-base font-bold text-slate-800 mb-3">
                                        Home State <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors appearance-none cursor-pointer font-medium">
                                        <option>Select your state</option>
                                        <option>Delhi</option>
                                        <option>Maharashtra</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Karnataka</option>
                                        {/* Add more states as needed */}
                                    </select>
                                </div>
                            </div>

                            {/* Branch Preferences */}
                            <div>
                                <label className="block text-base font-bold text-slate-800 mb-4">
                                    Branch Preferences (Optional)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {branches.map((branch) => (
                                        <button
                                            key={branch}
                                            type="button"
                                            onClick={() => handleBranchToggle(branch)}
                                            className={`px-5 py-2.5 rounded-full font-medium transition-all border ${selectedBranches.includes(branch)
                                                    ? 'bg-blue-50 border-blue-200 text-[#1E3A8A]'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            {branch}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* College Type */}
                            <div>
                                <label className="block text-base font-bold text-slate-800 mb-4">
                                    College Type
                                </label>
                                <div className="flex flex-wrap gap-6">
                                    {["IIT", "NIT", "IIIT", "GFTI"].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center w-5 h-5">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={["IIT", "NIT", "IIIT"].includes(type)}
                                                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded cursor-pointer checked:bg-[#2563EB] checked:border-[#2563EB] transition-colors"
                                                />
                                                <Search size={14} strokeWidth={4} className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" style={{ transform: 'scale(1.2)' }} />
                                            </div>
                                            <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Predict Button */}
                            <div className="pt-8">
                                <button
                                    type="button"
                                    className="w-full py-4 bg-[#F4511E] hover:bg-[#E64A19] text-white rounded-xl font-bold text-xl transition-all shadow-[0_8px_20px_-6px_rgba(255,87,34,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                                >
                                    <Search size={22} className="transition-transform group-hover:scale-110" />
                                    Predict My Colleges
                                </button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default RankPredictor;
