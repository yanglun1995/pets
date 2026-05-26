import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, MessageCircle, Eye, Clock, User, Send, UserPlus, LogIn } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useUserStore } from '../store/useUserStore';
import { useFeedStore } from '../store/useFeedStore';

const PostDetail = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { exchangePosts, helpRequests, events, exposures, likeExchangePost } = useAppStore();
  const { feedPosts } = useFeedStore();
  const { currentUser, addComment, getComments, register, login } = useUserStore();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [comment, setComment] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [authMessage, setAuthMessage] = useState('');

  let post = null;
  let postType = '';
  
  if (type === 'exchange') {
    post = exchangePosts.find(p => p.id === id);
    postType = 'exchange';
  } else if (type === 'help') {
    post = helpRequests.find(p => p.id === id);
    postType = 'help';
  } else if (type === 'event') {
    post = events.find(p => p.id === id);
    postType = 'event';
  } else if (type === 'exposure') {
    post = exposures.find(p => p.id === id);
    postType = 'exposure';
  } else if (type === 'feed') {
    post = feedPosts.find(p => p.id === id);
    postType = 'feed';
  }

  const comments = id ? getComments(id) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">帖子不存在</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-primary transition-all shadow-lg"
          >
            返回上一页
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    if (currentUser) {
      addComment({
        postId: id!,
        postType: postType as 'exchange' | 'help' | 'event' | 'exposure' | 'feed',
        content: comment,
        author: currentUser.username,
        authorId: currentUser.id,
        avatar: currentUser.avatar
      });
    } else {
      addComment({
        postId: id!,
        postType: postType as 'exchange' | 'help' | 'event' | 'exposure' | 'feed',
        content: comment,
        author: '匿名用户',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
      });
    }
    
    setComment('');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    let result;
    if (authMode === 'register') {
      result = register(formData.username, formData.email, formData.password);
      if (result.success) {
        setAuthMessage('注册成功！请登录');
        setAuthMode('login');
        setFormData({ username: '', email: formData.email, password: '' });
      } else {
        setAuthMessage(result.message);
      }
    } else {
      result = login(formData.email, formData.password);
      if (result.success) {
        setShowAuthModal(false);
        setAuthMessage('');
        setFormData({ username: '', email: '', password: '' });
      } else {
        setAuthMessage(result.message);
      }
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return d.toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {type === 'exchange' && '交流详情'}
              {type === 'help' && '互助详情'}
              {type === 'event' && '活动详情'}
              {type === 'exposure' && '曝光详情'}
              {type === 'feed' && '帖子详情'}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <img
                  src={'avatar' in post ? post.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {'author' in post ? post.author : post.organizer}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {formatDate(post.createdAt)}
                    </span>
                    {'views' in post && (
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {post.views} 浏览
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content || post.description}
                </p>
              </div>

              {'image' in post && post.image && (
                <div className="mt-6">
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full rounded-xl"
                  />
                </div>
              )}
              
              {'evidenceImages' in post && post.evidenceImages && post.evidenceImages.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.evidenceImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`证据${idx + 1}`} className="w-full rounded-xl" />
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {type === 'exchange' && 'category' in post && (
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                )}
                {type === 'help' && 'type' in post && (
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {post.type}
                  </span>
                )}
                {type === 'help' && 'location' in post && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    📍 {post.location}
                  </span>
                )}
                {type === 'event' && 'location' in post && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    📍 {post.location}
                  </span>
                )}
                {type === 'event' && 'date' in post && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    📅 {new Date(post.date).toLocaleDateString('zh-CN')}
                  </span>
                )}
                {type === 'exposure' && 'type' in post && (
                  <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {post.type}
                  </span>
                )}
                {type === 'exposure' && 'location' in post && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    📍 {post.location}
                  </span>
                )}
                {type === 'feed' && 'category' in post && (
                  <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => type === 'exchange' && postType === 'exchange' && likeExchangePost(post.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
                >
                  <ThumbsUp size={20} />
                  <span className="font-medium">{post.likes || 0}</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
                  <MessageCircle size={20} />
                  <span className="font-medium">{comments.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle size={24} className="text-primary" />
              评论 ({comments.length})
            </h3>

            <div className="mb-6">
              <form onSubmit={handleSubmitComment}>
                <div className="flex gap-3">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={currentUser ? "写下你的评论..." : "游客身份评论 (登录后可显示你的账号)"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      {!currentUser && (
                        <button
                          type="button"
                          onClick={() => setShowAuthModal(true)}
                          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          <UserPlus size={16} />
                          登录后发表评论
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="px-6 py-2 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full font-medium hover:from-purple-500 hover:to-primary transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send size={16} />
                        发送
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                  <p>暂无评论，来说两句吧~</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={c.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">{c.author}</span>
                        <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-primary to-purple-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {authMode === 'login' ? <LogIn size={24} /> : <UserPlus size={24} />}
                  {authMode === 'login' ? '登录' : '注册'}
                </h2>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthMessage('');
                  }}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="设置用户名"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="输入邮箱地址"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={authMode === 'register' ? '至少6个字符' : '输入密码'}
                  />
                </div>
                
                {authMessage && (
                  <p className={`text-sm ${authMessage.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>
                    {authMessage}
                  </p>
                )}
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-primary transition-all shadow-md"
                >
                  {authMode === 'login' ? '登录' : '注册'}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login');
                    setAuthMessage('');
                  }}
                  className="text-sm text-primary hover:text-primary/80"
                >
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

export default PostDetail;
