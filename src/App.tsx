import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppScreen, ToastMessage } from './types';
import Splash from './components/Splash';
import Login from './components/Login';
import ChoosePlatform from './components/ChoosePlatform';
import ConditionPage from './components/ConditionPage';
import PredictionScreen from './components/PredictionScreen';
import ToastContainer from './components/Toast';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [userId, setUserId] = useState<string>('');
  const [platform, setPlatform] = useState<'1xbet' | 'melbet'>('1xbet');
  const [subPlatform, setSubPlatform] = useState<string>('1xbet');
  const [generatedKey, setGeneratedKey] = useState<string>('');
  const [prefilledPassword, setPrefilledPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Force play background video on load to override any strict browser autoplay policies
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Video play was prevented by browser security. Will retry on first user interaction.", err);
        });
      }
    };

    playVideo();

    // In case the browser is waiting for an initial interaction, attach listeners to play the video on first click/touch
    const handleInteraction = () => {
      playVideo();
      // Remove listeners once playback starts
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Function to add dynamic floating toasts (disabled to suppress all toasts in the app)
  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    // Suppressed all toast notifications per user request
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to generate a compliant 16-character license key
  const generateVIPKey = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${segment()}-${segment()}-${segment()}-${segment()}`;
  };

  // Handle splash completion
  const handleSplashComplete = () => {
    setCurrentScreen(AppScreen.CHOOSE_PLATFORM);
  };

  const handleSelectPlatform = (selectedPlatform: '1xbet' | 'melbet') => {
    setPlatform(selectedPlatform);
    setSubPlatform(selectedPlatform + ' vip');
    setCurrentScreen(AppScreen.CONDITION);
  };

  // Handlers for navigation / business logic
  const handleGetPasswordTransition = () => {
    setCurrentScreen(AppScreen.CONDITION);
  };

  const handleConditionSubmit = (
    enteredUserId: string,
    chosenPlatform: '1xbet' | 'melbet',
    chosenSubPlatform: string,
    depositImg: string,
    promoImg: string
  ) => {
    setUserId(enteredUserId);
    setPlatform(chosenPlatform);
    setSubPlatform(chosenSubPlatform);
    
    // Direct bypass of key code step: login immediately
    setIsLoggedIn(true);
    setCurrentScreen(AppScreen.MAIN_PREDICTION);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGeneratedKey('');
    setPrefilledPassword('');
    setUserId('');
    setCurrentScreen(AppScreen.CHOOSE_PLATFORM);
  };

  return (
    <div className="sleek-app-bg min-h-screen text-slate-100 font-sans select-none overflow-x-hidden relative">
      {/* Immersive Global Background Video */}
      <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 animate-fade-in"
        >
          <source src="https://www.image2url.com/r2/default/videos/1783966636085-b5e564d8-3dbe-4413-973f-6486eba32365.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Absolute Master Toasts Layer */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Screen Router with Fluid Layout Staggers */}
      <AnimatePresence mode="wait">
        {currentScreen === AppScreen.SPLASH && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Splash onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {currentScreen === AppScreen.CHOOSE_PLATFORM && (
          <motion.div
            key="choose-platform"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ChoosePlatform
              onSelect={handleSelectPlatform}
              onBack={() => setCurrentScreen(AppScreen.SPLASH)}
            />
          </motion.div>
        )}

        {currentScreen === AppScreen.CONDITION && (
          <motion.div
            key="condition"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.4 }}
          >
            <ConditionPage
              initialPlatform={platform}
              onBack={() => setCurrentScreen(AppScreen.CHOOSE_PLATFORM)}
              onSubmit={handleConditionSubmit}
              addToast={addToast}
            />
          </motion.div>
        )}


        {currentScreen === AppScreen.MAIN_PREDICTION && (
          <motion.div
            key="prediction"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <PredictionScreen
              userId={userId || 'GUEST_VIP_USER'}
              platform={platform}
              subPlatform={subPlatform}
              onLogout={handleLogout}
              addToast={addToast}
            />
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
