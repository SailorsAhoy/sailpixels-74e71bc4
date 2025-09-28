
import { Heart, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <img 
        src="https://sailorsahoy.com/assets/img/logo.png" 
        alt="Logo"
        className="h-[50px] object-contain cursor-pointer"
        onClick={() => navigate('/')}
      />
      <div className="flex items-center space-x-4">
        <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
        <Send 
          className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" 
          onClick={() => navigate('/messages')}
        />
      </div>
    </header>
  );
};

export default Header;
