import { useState, useRef } from 'react';
import { Plus, MessageCircle, Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import ExchangeCard from '../components/ExchangeCard';

const Exchange = () => {
  const navigate = useNavigate();
  const { exchangePosts, addExchangePost, likeExchangePost } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '饮食健康',
    image: '',
    author: '热心用户',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  });

  const categories = ['全部', '饮食健康', '训练教育', '医疗护理', '日常护理', '其他'];
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredPosts = exchangePosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === '全部' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setFormData({...formData, image: base64});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExchangePost({
      ...formData,
      likes: 0,
      comments: 0
    });
    setFormData({
      title: '',
      content: '',
      category: '饮食健康',
      image: '',
      author: '热心用户',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    });
    setPreviewImage(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">养宠交流</h1>
                <p className="text-gray-500">分享你的养宠心得，交流经验</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-primary transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              发布交流
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索交流内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.map((post) => (
              <ExchangeCard
                key={post.id}
                post={post}
                onLike={likeExchangePost}
                onClick={() => navigate(`/post/exchange/${post.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐾</div>
            <p className="text-gray-500 text-lg">暂无相关交流内容</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-purple-500 text-white p-4 md:p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">发布交流</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setPreviewImage(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all text-base"
                    placeholder="给你的交流内容起个标题..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all text-base"
                  >
                    {categories.filter(c => c !== '全部').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none text-base"
                    placeholder="分享你的养宠心得..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    上传图片（可选）
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {previewImage ? (
                      <div className="relative">
                        <img src={previewImage} alt="预览" className="max-h-48 mx-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(null);
                            setFormData({...formData, image: ''});
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto mb-2 text-gray-400" size={40} />
                        <p className="text-gray-600 text-sm md:text-base">点击上传图片</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">支持 JPG、PNG 格式</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setPreviewImage(null);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all text-base"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-primary transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-base"
                  >
                    发布
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exchange;
