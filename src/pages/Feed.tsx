import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Plus } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useNavigate } from 'react-router-dom';

const FeedCard = ({ post, onClick }: { post: any; onClick: () => void }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const { likeFeedPost } = useFeedStore();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
      likeFeedPost(post.id);
    }
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

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer mb-4"
    >
      <div className="flex items-center gap-3 p-3 border-b border-gray-100">
        <img 
          src={post.avatar} 
          alt={post.author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800 text-sm">{post.author}</p>
          <p className="text-xs text-gray-400">{formatTime(post.createdAt)}</p>
        </div>
      </div>

      <div className="relative">
        {post.type === 'video' ? (
          <div className="relative aspect-[3/4]">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary ml-1">
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {post.views ? `${post.views}播放` : ''}
            </div>
          </div>
        ) : (
          <div className="aspect-[3/4]">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-600'}`}
          >
            <Heart size={22} fill={liked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={22} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <Share2 size={22} />
          </button>
          <button className="ml-auto text-gray-600">
            <Bookmark size={22} />
          </button>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-gray-800 text-sm">{post.title}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-primary text-xs">{tag}</span>
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

  const filteredPosts = feedPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-50 border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="搜索宠物内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button className="p-2 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide px-4 pb-2">
          {['推荐', '萌宠', '训练', '饮食', '好物', '视频', '活动', '互助'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full mr-2 transition-all"
              style={{
                backgroundColor: tag === '推荐' ? '#FF6B6B' : '#F3F4F6',
                color: tag === '推荐' ? 'white' : '#6B7280'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filteredPosts.map((post) => (
            <FeedCard 
              key={post.id} 
              post={post}
              onClick={() => navigate(`/post/feed/${post.id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
