import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Camera, ShieldAlert, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '发现', icon: Home },
    { path: '/nearby', label: '附近', icon: MapPin },
    { path: '/create', label: '发布', icon: Camera, isPlus: true },
    { path: '/exposure', label: '曝光', icon: ShieldAlert },
    { path: '/profile', label: '我的', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-1 transition-all relative ${
                item.isPlus ? '' : ''
              }`}
            >
              {item.isPlus ? (
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 via-red-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform -mt-6 border-4 border-white">
                  <span className="text-white text-3xl font-bold">+</span>
                </div>
              ) : (
                <>
                  <Icon 
                    size={24} 
                    strokeWidth={isActive(item.path) ? 2.5 : 2} 
                    className={isActive(item.path) ? 'text-pink-500' : 'text-gray-400'}
                  />
                  <span 
                    className={`text-xs mt-1 ${isActive(item.path) ? 'font-bold text-pink-500' : 'text-gray-400'}`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
