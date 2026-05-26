import { useState } from 'react';
import { ShieldAlert, Plus, Search, AlertTriangle, MapPin, Clock } from 'lucide-react';

interface ExposureItem {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  author: string;
  avatar: string;
  views: number;
  createdAt: Date;
  status: string;
}

const exposureList: ExposureItem[] = [
  {
    id: '1',
    title: '⚠️ 小区大型犬不牵绳',
    description: '今天在小区看到一只大型犬没有牵绳，差点吓到路过的小孩！希望主人能文明养宠，遵守规定。',
    location: '香洲区某小区',
    type: '不牵绳',
    author: '热心市民',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    views: 2345,
    createdAt: new Date(Date.now() - 3600000),
    status: '已处理'
  },
  {
    id: '2',
    title: '💩 宠物粪便不清理',
    description: '小区草坪上经常有人不清理宠物粪便，不仅影响环境，还容易传播细菌。请文明养宠！',
    location: '横琴新区',
    type: '粪便',
    author: '爱护环境',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    views: 1892,
    createdAt: new Date(Date.now() - 7200000),
    status: '处理中'
  },
  {
    id: '3',
    title: '🔊 夜间扰民',
    description: '每天晚上11点后还有狗狗不停吠叫，严重影响邻居休息。希望主人能管理好自家宠物。',
    location: '斗门区',
    type: '扰民',
    author: '苦不堪言',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    views: 3456,
    createdAt: new Date(Date.now() - 10800000),
    status: '已处理'
  },
  {
    id: '4',
    title: '⚠️ 宠物上车不戴嘴套',
    description: '看到有人带大型犬上公交车不戴嘴套，其他乘客都很害怕。希望加强管理！',
    location: '香洲区公交站',
    type: '违规',
    author: '市民小李',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    views: 1234,
    createdAt: new Date(Date.now() - 14400000),
    status: '待处理'
  }
];

const ExposureCard = ({ item }: { item: ExposureItem }) => {
  const getTypeColor = (type: string) => {
    switch(type) {
      case '不牵绳': return 'bg-red-100 text-red-600';
      case '粪便': return 'bg-orange-100 text-orange-600';
      case '扰民': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case '已处理': return 'bg-green-100 text-green-600';
      case '处理中': return 'bg-blue-100 text-blue-600';
      default: return 'bg-yellow-100 text-yellow-600';
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
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={item.avatar} 
            alt={item.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-800 flex-1">{item.title}</h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm line-clamp-2 mt-1">{item.description}</p>
          
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatTime(item.createdAt)}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{item.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                {item.type}
              </span>
              <span className="text-xs text-gray-400">{item.views}浏览</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Exposure = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '不牵绳'
  });

  const types = ['不牵绳', '粪便', '扰民', '违规', '遗弃', '其他'];

  const filteredExposures = exposureList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    setShowModal(false);
    alert('曝光成功！我们会尽快处理~');
    setFormData({ title: '', description: '', location: '', type: '不牵绳' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            不文明养宠曝光台
          </h1>
          <p className="text-gray-500 text-sm mt-1">共建文明养宠环境</p>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-5 mb-5 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <AlertTriangle size={28} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">发现不文明行为？</p>
              <p className="text-white/80 text-sm">曝光并监督，让养宠更文明</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-3.5 bg-white text-red-500 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            曝光不文明行为
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent" />
          <span className="text-gray-400 text-sm font-medium px-3">曝光列表</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent" />
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索曝光内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-300 border border-gray-200 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {types.map((type) => (
            <button
              key={type}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm hover:shadow-md transition-all"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredExposures.map((item) => (
            <ExposureCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🚨</div>
            <p className="text-xl font-bold text-gray-800">128</p>
            <p className="text-xs text-gray-500">曝光总数</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-xl font-bold text-green-600">96</p>
            <p className="text-xs text-gray-500">已处理</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-xl font-bold text-yellow-600">32</p>
            <p className="text-xs text-gray-500">处理中</p>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-5 rounded-t-3xl">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle size={24} />
                曝光不文明行为
              </h2>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">选择类型</label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, type})}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.type === type 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-700">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="简要描述不文明行为..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                  placeholder="详细说明事情经过..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">发生地点</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="如：香洲区某小区"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                提交曝光
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exposure;
