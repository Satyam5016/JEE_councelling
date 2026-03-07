import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import StatsStrip from '../components/sections/StatsStrip';
import ServicesSection from '../components/sections/ServicesSection';
import VideoLibrarySection from '../components/sections/VideoLibrarySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AboutFounderSection from '../components/sections/AboutFounderSection';
import ContactSection from '../components/sections/ContactSection';
import CTASplitSection from '../components/sections/CTASplitSection';

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash]);

    return (
        <div className="w-full overflow-hidden">
            <HeroSection />
            <StatsStrip />
            <ServicesSection />
            <VideoLibrarySection />
            <TestimonialsSection />
            <AboutFounderSection />
            <ContactSection />
            <CTASplitSection />
        </div>
    );
};

export default Home;
