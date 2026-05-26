import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Heart, Calendar, ShieldAlert, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/exchange', label: '交流', icon: MessageCircle },
    { path: '/help', label: '互助', icon: Heart },
    { path: '/events', label: '活动', icon: Calendar },
    { path: '/exposure', label: '曝光', icon: ShieldAlert },
    { path: '/about', label: '关于', icon: User }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-2 py-1 transition-all ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
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
