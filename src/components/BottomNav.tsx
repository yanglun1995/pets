import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Heart, Camera, MapPin, Video } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '发现', icon: Home },
    { path: '/video', label: '视频', icon: Video },
    { path: '/nearby', label: '附近', icon: MapPin },
    { path: '/exposure', label: '曝光', icon: Camera },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-4 py-1 transition-all relative ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute -top-1 w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
              )}
              <Icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              <span className={`text-xs mt-1 ${isActive(item.path) ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
