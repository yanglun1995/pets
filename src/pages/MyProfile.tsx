import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Settings, Edit, HeartOff } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { currentPetProfile } = useFeedStore();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(true);

  const profile = currentPetProfile || {
    id: 'demo',
    name: '妮妮',
    avatar: 'https://images.unsplash.com/photo-1593036800269-019af93b5d99?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop',
    breed: '威尔士柯基犬',
    age: 3,
    gender: 'female' as const,
    description: '我叫妮妮，3岁女孩纸~ 🐾\n\n🏠 家住珠海十字门\n\n💕 爱好：吃和睡\n\n✨ 技能：握手、坐下\n\n快来和我交朋友吧！',
    followers: 12345,
    following: 567,
    posts: 89,
    owner: '妮妮主人',
    ownerAvatar: 'https://images.unsplash.com/photo-1593036800269-019af93b5d99?w=100&h=100&fit=crop',
    createdAt: new Date()
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const myPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1593036800269-019af93b5d99?w=400&h=400&fit=crop',
      likes: 234,
      comments: 45
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400&h=400&fit=crop',
      likes: 567,
      comments: 89
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
      likes: 123,
      comments: 23
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1593036800269-019af93b5d99?w=400&h=400&fit=crop',
      likes: 890,
      comments: 123
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400&h=400&fit=crop',
      likes: 456,
      comments: 67
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
      likes: 321,
      comments: 45
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pb-24">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">我的主页</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={22} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="bg-white">
        <div className="relative h-32 md:h-48 overflow-hidden rounded-b-3xl">
          <img 
            src={profile.coverImage} 
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="px-4 -mt-16 relative z-10">
          <div className="flex items-end justify-between mb-4">
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">♀</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Edit size={16} />
              编辑资料
            </button>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500 text-sm">@{profile.owner}</p>
          </div>

          <div className="flex gap-6 mb-4">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.posts)}</p>
              <p className="text-xs text-gray-500">帖子</p>
            </div>
            <div className="text-center cursor-pointer" onClick={() => alert('粉丝列表')}>
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.followers)}</p>
              <p className="text-xs text-gray-500">粉丝</p>
            </div>
            <div className="text-center cursor-pointer" onClick={() => alert('关注列表')}>
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.following)}</p>
              <p className="text-xs text-gray-500">关注</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-2.5 rounded-full font-medium text-sm transition-all ${
                isFollowing 
                  ? 'bg-gray-100 text-gray-700 border border-gray-300' 
                  : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
              }`}
            >
              {isFollowing ? '已关注' : '+ 关注'}
            </button>
            <button className="px-6 py-2.5 border border-gray-200 rounded-full font-medium text-sm text-gray-700">
              发消息
            </button>
          </div>

          <div className="space-y-3 mb-4">
            {profile.description.split('\n').map((line, idx) => (
              <p key={idx} className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {line}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pb-4">
            <span className="px-3 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">🐾 柯基</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">🏠 珠海</span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">🍖 吃货</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-600 rounded-full text-xs font-medium">😴 嗜睡</span>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2">
        <div className="flex border-b border-gray-100">
          <button className="flex-1 py-3 text-sm font-bold text-pink-500 border-b-2 border-pink-500 flex items-center justify-center gap-1">
            <span>帖子</span>
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-400 flex items-center justify-center gap-1">
            <Bookmark size={16} />
            <span>收藏</span>
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-400 flex items-center justify-center gap-1">
            <Heart size={16} />
            <span>赞过</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {myPosts.map((post) => (
            <div 
              key={post.id} 
              className="aspect-square relative overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/post/detail/${post.id}`)}
            >
              <img 
                src={post.image} 
                alt="post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-white">
                  <Heart size={18} fill="white" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <MessageCircle size={18} fill="white" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
            🐕
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">今日互动</p>
            <p className="text-xs text-gray-500">收到 23 个赞，5 条评论</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
