import { useState } from 'react';
import { ShieldAlert, Plus, Search } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import ExposureCard from '../components/ExposureCard';

const Exposure = () => {
  const { exposures, addExposure } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('全部');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '不牵绳',
    author: '',
    evidenceImages: ''
  });

  const types = ['全部', '不牵绳', '随地便溺', '扰民', '遗弃宠物', '其他'];

  const filteredExposures = exposures.filter((exposure) => {
    const matchesSearch = exposure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exposure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === '全部' || exposure.type === activeType;
    return matchesSearch && matchesType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.location && formData.author) {
      addExposure({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        author: formData.author,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        evidenceImages: formData.evidenceImages ? [formData.evidenceImages] : [],
        status: '待处理'
      });
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        type: '不牵绳',
        author: '',
        evidenceImages: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <ShieldAlert size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">不文明养宠曝光台</h1>
                <p className="text-gray-500">曝光不文明养宠行为，促进社区和谐</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              曝光不文明
            </button>
          </div>

          {/* Notice */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-red-600">温馨提示：</span>
              请提供真实有效的不文明养宠行为线索，我们可以一起建设文明和谐的养宠环境。
              曝光内容需属实，不得恶意诽谤他人。
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索曝光内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeType === type
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-red-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-red-500">{exposures.length}</div>
            <div className="text-sm text-gray-500">曝光总数</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-500">
              {exposures.filter(e => e.status === '处理中').length}
            </div>
            <div className="text-sm text-gray-500">处理中</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-500">
              {exposures.filter(e => e.status === '已处理').length}
            </div>
            <div className="text-sm text-gray-500">已处理</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-500">
              {exposures.reduce((sum, e) => sum + e.views, 0)}
            </div>
            <div className="text-sm text-gray-500">总浏览量</div>
          </div>
        </div>

        {/* Exposures Grid */}
        {filteredExposures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExposures.map((exposure) => (
              <ExposureCard key={exposure.id} exposure={exposure} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">暂无相关曝光内容</p>
          </div>
        )}
      </div>

      {/* 发布曝光 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">曝光不文明养宠行为</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  曝光标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  placeholder="例如：某小区大型犬未牵绳追逐行人"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  详细描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  placeholder="详细描述不文明行为的时间、地点、具体情况等"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    发生地点 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder="例如：北京市朝阳区某小区"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    行为类型 <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  >
                    <option value="不牵绳">不牵绳</option>
                    <option value="随地便溺">随地便溺</option>
                    <option value="扰民">扰民</option>
                    <option value="遗弃宠物">遗弃宠物</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您的昵称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  placeholder="例如：热心市民"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  证据图片（可选）
                </label>
                <input
                  type="url"
                  value={formData.evidenceImages}
                  onChange={(e) => setFormData({...formData, evidenceImages: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  placeholder="输入证据图片URL"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
                >
                  提交曝光
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exposure;
