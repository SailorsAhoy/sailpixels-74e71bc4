
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => clearTimeout(contentTimer);
  }, []);

  const handleDemoClick = () => {
    setIsVisible(false);
    onLoadingComplete();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#293462] to-[#04abf2]">
      {!showContent ? (
        <img 
          src="https://sailorsahoy.com/logo.gif" 
          alt="Loading..."
          className="w-[250px] h-[250px] object-contain"
        />
      ) : (
        <div className="flex flex-col items-center">
          <img 
            src="https://sailorsahoy.com/logo-round-dark-150.png" 
            alt="SailPixels Logo"
            className="w-[275px] h-[275px] object-contain mb-8"
          />
          
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-2">sailPixels</h1>
            <p className="text-white text-lg">the image sharing app for sailors</p>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <Button 
              onClick={handleDemoClick}
              className="bg-white text-[#293462] hover:bg-gray-100 px-8 py-3 text-lg font-medium border-0"
            >
              Demo
            </Button>
            <p className="text-white text-sm opacity-80">(in development, launch mid July 2025)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
