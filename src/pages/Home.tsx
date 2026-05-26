import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Heart, Calendar } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import ExchangeCard from '../components/ExchangeCard';
import HelpCard from '../components/HelpCard';
import EventCard from '../components/EventCard';

const Home = () => {
  const { exchangePosts, helpRequests, events, likeExchangePost, registerEvent } = useAppStore();

  const featuredPosts = exchangePosts.slice(0, 3);
  const featuredRequests = helpRequests.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero Section with Flat Illustration Background */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#FFB6C1" opacity="0.3" />
            <circle cx="1100" cy="150" r="100" fill="#FFDAB9" opacity="0.3" />
            <circle cx="600" cy="500" r="120" fill="#E6E6FA" opacity="0.3" />
            <circle cx="200" cy="450" r="60" fill="#98FB98" opacity="0.3" />
            <circle cx="1000" cy="400" r="90" fill="#FFA07A" opacity="0.3" />
            
            <g transform="translate(200, 200)">
              <ellipse cx="80" cy="100" rx="60" ry="40" fill="#F4A460" />
              <circle cx="80" cy="50" r="35" fill="#F4A460" />
              <ellipse cx="55" cy="25" rx="15" ry="20" fill="#F4A460" />
              <ellipse cx="105" cy="25" rx="15" ry="20" fill="#F4A460" />
              <circle cx="70" cy="45" r="5" fill="#333" />
              <circle cx="90" cy="45" r="5" fill="#333" />
              <ellipse cx="80" cy="60" rx="4" ry="3" fill="#333" />
              <path d="M70 70 Q80 80 90 70" stroke="#333" strokeWidth="2" fill="none" />
            </g>
            
            <g transform="translate(800, 250)">
              <ellipse cx="70" cy="90" rx="50" ry="35" fill="#D2691E" />
              <circle cx="70" cy="45" r="30" fill="#D2691E" />
              <ellipse cx="48" cy="22" rx="12" ry="18" fill="#D2691E" />
              <ellipse cx="92" cy="22" rx="12" ry="18" fill="#D2691E" />
              <circle cx="60" cy="40" r="4" fill="#333" />
              <circle cx="80" cy="40" r="4" fill="#333" />
              <ellipse cx="70" cy="52" rx="3" ry="2.5" fill="#333" />
              <path d="M62 60 Q70 68 78 60" stroke="#333" strokeWidth="2" fill="none" />
            </g>
            
            <g transform="translate(500, 350)">
              <ellipse cx="60" cy="80" rx="45" ry="30" fill="#FFD700" />
              <circle cx="60" cy="40" r="25" fill="#FFD700" />
              <ellipse cx="42" cy="20" rx="10" ry="15" fill="#FFD700" />
              <ellipse cx="78" cy="20" rx="10" ry="15" fill="#FFD700" />
              <circle cx="52" cy="36" r="3.5" fill="#333" />
              <circle cx="68" cy="36" r="3.5" fill="#333" />
              <ellipse cx="60" cy="47" rx="2.5" ry="2" fill="#333" />
              <path d="M54 53 Q60 59 66 53" stroke="#333" strokeWidth="2" fill="none" />
            </g>
            
            <rect x="0" y="450" width="1200" height="150" fill="#90EE90" />
          </svg>
        </div>
        
        <div className="absolute top-10 left-10 text-6xl opacity-30 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>🐾</div>
        <div className="absolute top-20 right-16 text-5xl opacity-25 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2.5s'}}>🐱</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>🐰</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-25 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.5s'}}>🐹</div>
        <div className="absolute top-40 left-1/4 text-3xl opacity-30 animate-bounce" style={{animationDelay: '2s', animationDuration: '2.8s'}}>🦴</div>
        <div className="absolute bottom-40 right-1/4 text-4xl opacity-20 animate-bounce" style={{animationDelay: '0.8s', animationDuration: '3.2s'}}>🎾</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="w-44 h-44 rounded-full mx-auto mb-6 shadow-2xl border-4 border-white hover:scale-110 transition-transform duration-300 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop" 
                  alt="可爱的柯基犬"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=400&fit=crop";
                  }}
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              欢迎来到 <span style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', cursive", background: 'linear-gradient(to right, #ff6b6b, #feca57, #48dbfb, #ff9ff3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>宠互助</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              一个温暖的宠物爱好者社区，在这里分享养宠心得，互相帮助，一起参与精彩活动
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/exchange"
                className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-warm-600 transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                开始交流
              </Link>
              <Link
                to="/events"
                className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-full font-medium hover:bg-warm-50 transition-all hover:scale-105"
              >
                查看活动
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-primary">1.2K+</div>
              <div className="text-gray-500 mt-1">养宠伙伴</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">856</div>
              <div className="text-gray-500 mt-1">互助成功</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">156</div>
              <div className="text-gray-500 mt-1">精彩活动</div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">热门交流</h2>
            </div>
            <Link
              to="/exchange"
              className="flex items-center gap-2 text-primary hover:text-warm-600 font-medium transition-colors"
            >
              查看更多
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <ExchangeCard
                key={post.id}
                post={post}
                onLike={likeExchangePost}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">精选互助</h2>
            </div>
            <Link
              to="/help"
              className="flex items-center gap-2 text-primary hover:text-warm-600 font-medium transition-colors"
            >
              查看更多
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRequests.map((request) => (
              <HelpCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">活动预告</h2>
            </div>
            <Link
              to="/events"
              className="flex items-center gap-2 text-primary hover:text-warm-600 font-medium transition-colors"
            >
              查看更多
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={registerEvent}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
