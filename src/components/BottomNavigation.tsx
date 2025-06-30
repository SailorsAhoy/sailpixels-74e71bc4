
import { Menu, Search, Plus, Image, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Menu, path: '/profile', label: 'Profile' },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: Plus, path: '/new-post', label: 'New Post' },
    { icon: Image, path: '/', label: 'Home' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, path, label }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`p-3 rounded-lg transition-colors ${
              location.pathname === path
                ? 'text-blue-500'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
