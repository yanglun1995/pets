import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, Home, User, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/exchange', label: '养宠交流', icon: MessageCircle },
    { path: '/help', label: '养宠互助', icon: Heart },
    { path: '/events', label: '宠物活动', icon: Calendar },
    { path: '/exposure', label: '曝光台', icon: ShieldAlert },
    { path: '/about', label: '关于', icon: User }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-4xl animate-bounce">🐕</div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">宠互助</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-warm-50 hover:text-primary'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
