
import { Heart, Send, Eye, MessageCircle, MapPin, Calendar } from 'lucide-react';

const Home = () => {
  const images = Array.from({ length: 10 }, (_, i) => i + 1);
  
  const postDescriptions = [
    "Perfect sunrise sail this morning! Nothing beats the serenity of early waters ⛵",
    "Caught some amazing wind today - 15 knots of pure sailing bliss! 🌊",
    "Marina life at its finest. Love the community here! 🛥️",
    "Dolphin encounter during our afternoon cruise! They followed us for miles 🐬",
    "Racing prep day - tuning the rigging for next week's regatta ⚡",
    "Sunset anchor spot discovered! This hidden cove is absolutely magical ✨",
    "Learning knots with the crew - sailor skills never get old! 🪢",
    "Storm clouds rolling in but we made it to port safely ⛈️",
    "Fresh catch of the day! Nothing like fishing from your own boat 🎣",
    "Full moon night sail - the water looked like liquid silver 🌙"
  ];

  const getViewCount = (index: number) => {
    const counts = [875, 1200, 456, 23400, 987, 15600, 234, 45200, 678, 12300];
    const count = counts[index];
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
  };

  const getLikeCount = (index: number) => {
    const counts = [92, 156, 43, 2100, 87, 1800, 34, 3200, 67, 890];
    const count = counts[index];
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
  };

  const getDates = (index: number) => {
    const dates = [
      "15/12/24", "14/12/24", "13/12/24", "12/12/24", "11/12/24",
      "10/12/24", "09/12/24", "08/12/24", "07/12/24", "06/12/24"
    ];
    return dates[index];
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6 p-4">
        {images.map((num, index) => (
          <div key={num} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center p-3 border-b border-gray-100">
              <img 
                src="https://sailorsahoy.com/icon_whitecircle.png" 
                alt="SailorsAhoy"
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <span className="font-medium text-sm">SailorsAhoy</span>
            </div>
            <img
              src={`https://sailorsahoy.com/pixel/img/${num}.jpg`}
              alt={`Post ${num}`}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
                  <Send className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {getDates(index)}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {getViewCount(index)}
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {getLikeCount(index)}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 50) + 1}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  Marina
                </div>
              </div>
              
              <p className="text-sm text-gray-800">{postDescriptions[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
