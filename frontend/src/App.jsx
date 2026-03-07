import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import FloatingContactButton from './components/FloatingContactButton';
import RankPredictor from './pages/RankPredictor';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import BasicPage from './pages/packages/BasicPage';
import ElitePage from './pages/packages/ElitePage';
import PremiumPage from './pages/packages/PremiumPage';
import PaymentSuccess from './pages/PaymentSuccess';
import VideoListing from './pages/VideoListing';
import VideoDetail from './pages/VideoDetail';
import AboutPage from './pages/AboutPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex flex-col bg-bg-light text-slate-800 relative">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rank-predictor" element={<RankPredictor />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/packages/basic" element={<BasicPage />} />
            <Route path="/packages/elite" element={<ElitePage />} />
            <Route path="/packages/premium" element={<PremiumPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/videos" element={<VideoListing />} />
            <Route path="/videos/:videoId" element={<VideoDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/sign-in/*"
              element={
                <div className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-b from-slate-50 to-indigo-50/30">
                  <SignIn routing="path" path="/sign-in" />
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-b from-slate-50 to-indigo-50/30">
                  <SignUp routing="path" path="/sign-up" />
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    </Router>
  );
}

export default App;
