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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-50 via-warm-100 to-warm-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-6xl">🐕</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              欢迎来到<span className="text-primary">宠互助</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              一个温暖的宠物爱好者社区，在这里分享养宠心得，互相帮助，一起参与精彩活动
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/exchange"
                className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-warm-600 transition-all shadow-md hover:shadow-lg"
              >
                开始交流
              </Link>
              <Link
                to="/events"
                className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-full font-medium hover:bg-warm-50 transition-all"
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
