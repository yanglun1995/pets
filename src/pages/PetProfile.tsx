import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ArrowLeft, Settings, Camera, MapPin } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useParams } from 'react-router-dom';

const PetProfile = () => {
  const { id } = useParams();
  const { petProfiles, feedPosts } = useFeedStore();
  const [isFollowing, setIsFollowing] = useState(false);

  const profile = petProfiles.find(p => p.id === id) || petProfiles[0];
  const petPosts = feedPosts.filter(p => p.author === profile.owner);

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-50 border-b border-gray-100">
        <div className="px-4 py-3 flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">@{profile.name}</h1>
          <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="bg-white">
        <div className="relative h-48 md:h-64">
          <img 
            src={profile.coverImage} 
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="px-4 -mt-16 relative">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <button className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <Camera size={18} />
              </button>
            </div>
            <div className="flex-1 pb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">{profile.name}</h2>
              <p className="text-white/80 text-sm">{profile.breed} · {profile.age}岁 · {profile.gender === 'male' ? '公' : '母'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.posts)}</p>
              <p className="text-xs text-gray-500">帖子</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.followers)}</p>
              <p className="text-xs text-gray-500">粉丝</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.following)}</p>
              <p className="text-xs text-gray-500">关注</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-2.5 rounded-full font-medium text-sm transition-all ${
                isFollowing 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg'
              }`}
            >
              {isFollowing ? '已关注' : '+ 关注'}
            </button>
            <button className="px-6 py-2.5 border border-gray-200 rounded-full font-medium text-sm text-gray-700">
              发消息
            </button>
          </div>

          {profile.description && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-700 text-sm">{profile.description}</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-pink-50 rounded-full">
              <Heart size={16} className="text-pink-500" />
              <span className="text-xs text-gray-700">爱撒娇</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full">
              <span className="text-xs text-gray-700">#{profile.breed}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full">
              <span className="text-xs text-gray-700">爱玩耍</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2">
        <div className="flex border-b border-gray-100">
          <button className="flex-1 py-3 text-sm font-medium text-primary border-b-2 border-primary">
            帖子
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-500">
            收藏
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-500">
            赞过
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 p-1">
          {petPosts.slice(0, 9).map((post) => (
            <div key={post.id} className="aspect-square relative overflow-hidden">
              <img 
                src={post.image || post.thumbnail} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {post.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary ml-0.5">
                      <path fill="currentColor" d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
