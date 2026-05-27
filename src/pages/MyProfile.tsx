import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Settings, Edit, User, LogIn, UserPlus, LogOut, Mail, Lock, UserCircle } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useUserStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { currentPetProfile } = useFeedStore();
  const { currentUser, demoLogin, register, login, logout } = useUserStore();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [authMessage, setAuthMessage] = useState('');

  const profile = currentPetProfile || {
    id: 'demo',
    name: '妮妮',
    avatar: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop',
    breed: '威尔士柯基犬',
    age: 3,
    gender: 'female' as const,
    description: '我叫妮妮，3岁女孩纸~ 🐾\n\n🏠 家住珠海十字门\n\n💕 爱好：吃和睡\n\n✨ 技能：握手、坐下\n\n快来和我交朋友吧！',
    followers: 12345,
    following: 567,
    posts: 89,
    owner: '妮妮主人',
    ownerAvatar: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=100&h=100&fit=crop',
    createdAt: new Date()
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const myPosts = [
    { id: '1', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400&h=400&fit=crop', likes: 234, comments: 45 },
    { id: '2', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop', likes: 567, comments: 89 },
    { id: '3', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400&h=400&fit=crop', likes: 123, comments: 23 },
    { id: '4', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop', likes: 890, comments: 123 },
    { id: '5', image: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=400&h=400&fit=crop', likes: 456, comments: 67 },
    { id: '6', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop', likes: 321, comments: 45 }
  ];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    let result;
    if (authMode === 'register') {
      result = register(formData.username, formData.email, formData.password);
    } else {
      result = login(formData.email, formData.password);
    }
    if (result.success) {
      setShowAuthModal(false);
      setAuthMessage('');
      setFormData({ username: '', email: '', password: '' });
    } else {
      setAuthMessage(result.message);
    }
  };

  const handleDemoLogin = () => {
    const result = demoLogin();
    alert(result.message + ' (演示账号：妮妮主人)');
  };

  const handleLogout = () => {
    logout();
    alert('已退出登录');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pb-24">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">我的主页</h1>
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-pink-200" />
                <span className="text-sm text-gray-600">{currentUser.username}</span>
                <button onClick={handleLogout} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <LogOut size={18} className="text-gray-400" />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <UserCircle size={22} className="text-pink-500" />
              </button>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings size={22} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {!currentUser && (
        <div className="mx-4 mt-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <UserCircle size={40} />
            <div className="flex-1">
              <p className="font-bold">登录/注册</p>
              <p className="text-sm text-white/80">登录后可评论、发布、打招呼</p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-2 bg-white text-pink-500 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              立即登录
            </button>
            <button
              onClick={handleDemoLogin}
              className="px-5 py-2 bg-white/20 text-white border border-white/40 rounded-full text-sm font-bold hover:bg-white/30 transition-all"
            >
              体验账号
            </button>
          </div>
        </div>
      )}

      {currentUser && (
        <div className="mx-4 mt-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <img src={currentUser.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
            <div className="flex-1">
              <p className="font-bold">{currentUser.username}</p>
              <p className="text-sm text-white/80">已登录 · {currentUser.email}</p>
            </div>
            <button onClick={handleLogout} className="px-4 py-1.5 bg-white/20 text-white border border-white/40 rounded-full text-sm hover:bg-white/30 transition-all">
              退出
            </button>
          </div>
        </div>
      )}

      <div className="bg-white mt-3">
        <div className="relative h-32 md:h-48 overflow-hidden rounded-b-3xl">
          <img src={profile.coverImage} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="px-4 -mt-16 relative z-10">
          <div className="flex items-end justify-between mb-4">
            <div className="relative">
              <img src={profile.avatar} alt={profile.name} className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover" />
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
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.followers)}</p>
              <p className="text-xs text-gray-500">粉丝</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{formatNumber(profile.following)}</p>
              <p className="text-xs text-gray-500">关注</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button onClick={() => setIsFollowing(!isFollowing)} className={`flex-1 py-2.5 rounded-full font-medium text-sm transition-all ${isFollowing ? 'bg-gray-100 text-gray-700 border border-gray-300' : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'}`}>
              {isFollowing ? '已关注' : '+ 关注'}
            </button>
            <button className="px-6 py-2.5 border border-gray-200 rounded-full font-medium text-sm text-gray-700">发消息</button>
          </div>

          <div className="space-y-3 mb-4">
            {profile.description.split('\n').map((line, idx) => (
              <p key={idx} className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{line}</p>
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
            <div key={post.id} className="aspect-square relative overflow-hidden cursor-pointer group" onClick={() => navigate(`/post/detail/feed/${post.id}`)}>
              <img src={post.image} alt="post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
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

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setShowAuthModal(false); setAuthMessage(''); }}>
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-5 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {authMode === 'login' ? <LogIn size={22} /> : <UserPlus size={22} />}
                  {authMode === 'login' ? '登录' : '注册'}
                </h2>
                <button onClick={() => { setShowAuthModal(false); setAuthMessage(''); }} className="p-1 hover:bg-white/20 rounded-full transition-colors">✕</button>
              </div>
            </div>
            <div className="p-5">
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">用户名</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all" placeholder="输入用户名" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">邮箱</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all" placeholder="输入邮箱地址" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 text-left">密码</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
                      placeholder={authMode === 'register' ? '至少6个字符' : '输入密码'} />
                  </div>
                </div>
                {authMessage && (
                  <p className={`text-sm text-center ${authMessage.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>{authMessage}</p>
                )}
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all shadow-md">
                  {authMode === 'login' ? '登录' : '注册'}
                </button>
              </form>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">或者</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-3 border-2 border-pink-200 text-pink-500 rounded-xl font-bold hover:bg-pink-50 transition-all flex items-center justify-center gap-2 mb-3"
              >
                <UserCircle size={20} />
                使用演示账号
              </button>

              <div className="text-center">
                <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthMessage(''); }}
                  className="text-sm text-pink-500 hover:text-pink-600">
                  {authMode === 'login' ? '还没有账号？立即注册' : '已有账号？立即登录'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;