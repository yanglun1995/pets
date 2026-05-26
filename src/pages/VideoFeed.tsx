import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, Plus, Play } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }: { video: any }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="relative aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play size={28} className="text-primary ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {formatNumber(video.views)}播放
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <img 
            src={video.avatar} 
            alt={video.author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm truncate">{video.title}</h3>
            <p className="text-gray-500 text-xs truncate">{video.author}</p>
            <p className="text-gray-600 text-xs mt-1 line-clamp-2">{video.description}</p>
          </div>
        </div>

        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {video.tags.map((tag: string, index: number) => (
              <span key={index} className="text-primary text-xs">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-600'}`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            <span className="text-sm">{formatNumber(likes)}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={20} />
            <span className="text-sm">{formatNumber(video.comments)}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <Share2 size={20} />
          </button>
          <button className="ml-auto text-gray-600">
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoFeed = () => {
  const { videoPosts } = useFeedStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videoPosts.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                placeholder="搜索宠物视频..."
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
          {['推荐', '搞笑', '治愈', '训练', '美容', '日常', '萌宠', '合集'].map((tag) => (
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
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideoFeed;
