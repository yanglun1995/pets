import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Plus } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useNavigate } from 'react-router-dom';

const FeedCard = ({ post, onClick }: { post: any; onClick: () => void }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const { likeFeedPost } = useFeedStore();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
      likeFeedPost(post.id);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer mb-4 transform hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 p-4 border-b border-gray-50">
        <img 
          src={post.avatar} 
          alt={post.author}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-100"
        />
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">{post.author}</p>
          <p className="text-xs text-gray-400">{formatTime(post.createdAt)}</p>
        </div>
      </div>

      <div className="relative">
        {post.type === 'video' ? (
          <div className="relative aspect-[4/5]">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-pink-500 ml-1">
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              {post.views ? `${formatNumber(post.views)}播放` : ''}
            </div>
          </div>
        ) : (
          <div className="aspect-[4/5]">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {post.category && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg backdrop-blur-sm">
            {post.category === '柯基' && '🐶'}
            {post.category === '柴犬' && '🦊'}
            {post.category === '猫咪' && '🐱'}
            {post.category === '金毛' && '🐕'}
            {post.category}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-all ${liked ? 'text-red-500 transform scale-110' : 'text-gray-600 hover:text-red-400'}`}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} className={liked ? 'animate-bounce' : ''} />
            <span className="text-sm font-semibold">{formatNumber(likes)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-600 hover:text-pink-400 transition-colors">
            <MessageCircle size={24} />
            <span className="text-sm font-semibold">{formatNumber(post.comments)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-600 hover:text-pink-400 transition-colors">
            <Share2 size={24} />
          </button>
          <button 
            onClick={handleSave}
            className={`ml-auto transition-all ${saved ? 'text-yellow-500 transform scale-110' : 'text-gray-400 hover:text-yellow-500'}`}
          >
            <Bookmark size={24} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-gray-800 text-base leading-relaxed">{post.title}</p>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-pink-500 text-xs font-medium bg-pink-50 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Feed = () => {
  const { feedPosts } = useFeedStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('推荐');

  const filteredPosts = feedPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category === activeTab
  );

  const tabs = ['推荐', '养宠心得', '饮食红黑榜', '曝光台'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🐾</div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              宠互助
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="搜索宠物内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 border border-gray-100 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide px-4 pb-3 gap-2">
          {tabs.map((tag) => {
            if (tag === '曝光台') {
              return (
                <button
                  key={tag}
                  onClick={() => navigate('/exposure')}
                  className="px-5 py-2 text-sm font-bold whitespace-nowrap rounded-full transition-all shadow-sm"
                  style={{
                    backgroundColor: 'linear-gradient(135deg, #FF6B35 0%, #FF2D2D 100%)',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF2D2D 100%)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
                  }}
                >
                  ⚠️ {tag}
                </button>
              );
            }
            return (
              <button
                key={tag}
                onClick={() => setActiveTab(tag)}
                className="px-5 py-2 text-sm font-bold whitespace-nowrap rounded-full transition-all shadow-sm"
                style={{
                  backgroundColor: activeTab === tag ? 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)' : 'white',
                  background: activeTab === tag ? 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)' : 'white',
                  color: activeTab === tag ? 'white' : '#6B7280',
                  boxShadow: activeTab === tag ? '0 4px 15px rgba(255, 107, 157, 0.4)' : '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                {tag === '养宠心得' && '📝'}
                {tag === '饮食红黑榜' && '🍖'}
                {' '}{tag}
              </button>
            );
          })}
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {filteredPosts.map((post) => (
            <FeedCard 
              key={post.id} 
              post={post}
              onClick={() => navigate(`/post/detail/${post.id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
