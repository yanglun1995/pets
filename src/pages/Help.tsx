import { useState, useRef } from 'react';
import { Plus, Heart, Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import HelpCard from '../components/HelpCard';

const Help = () => {
  const navigate = useNavigate();
  const { helpRequests, addHelpRequest } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '资源寻找',
    location: '',
    image: '',
    author: '需要帮助的铲屎官',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    contact: '',
    urgency: 3,
    status: '进行中'
  });

  const types = ['全部', '资源寻找', '临时托管', '寻宠启事', '医疗咨询', '其他'];
  const [activeType, setActiveType] = useState('全部');

  const filteredRequests = helpRequests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === '全部' || request.type === activeType;
    return matchesSearch && matchesType;
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
    addHelpRequest(formData);
    setFormData({
      title: '',
      description: '',
      type: '资源寻找',
      location: '',
      image: '',
      author: '需要帮助的铲屎官',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      contact: '',
      urgency: 3,
      status: '进行中'
    });
    setPreviewImage(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">养宠互助</h1>
                <p className="text-gray-500">互帮互助，温暖有爱的宠物社区</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-pink-500 hover:to-red-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              发布求助
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索求助内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeType === type
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-red-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredRequests.map((request) => (
              <HelpCard 
                key={request.id} 
                request={request}
                onClick={() => navigate(`/post/help/${request.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <p className="text-gray-500 text-lg">暂无相关求助信息</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 md:p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">发布求助</h2>
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all text-base"
                    placeholder="简要描述你的求助..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">类型</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all text-base"
                    >
                      {types.filter(t => t !== '全部').map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">紧急度</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all text-base"
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <option key={level} value={level}>
                          {level} 星{level >= 4 ? ' (紧急)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">位置</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all text-base"
                    placeholder="你的所在城市/区域"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all text-base"
                    placeholder="手机号/微信/邮箱..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all resize-none text-base"
                    placeholder="详细描述你的需求..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    上传图片（可选）
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 text-center hover:border-red-500 transition-colors cursor-pointer"
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-pink-500 hover:to-red-500 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-base"
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

export default Help;
