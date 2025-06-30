
import { Heart, Send } from 'lucide-react';

const Home = () => {
  const images = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6 p-4">
        {images.map((num) => (
          <div key={num} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center p-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <span className="font-medium text-sm">user_{num}</span>
            </div>
            <img
              src={`https://sailorsahoy.com/pixel/img/${num}.jpg`}
              alt={`Post ${num}`}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <div className="flex items-center space-x-4 mb-2">
                <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
                <Send className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">Sample post description for image {num}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
