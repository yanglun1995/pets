import { useState } from 'react';
import { ShieldAlert, Plus, Search } from 'lucide-react';
import ExposureCard from '../components/ExposureCard';

interface Exposure {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  author: string;
  avatar: string;
  views: number;
  dislikes: number;
  evidenceImages?: string[];
  createdAt: Date;
  status: string;
}

const mockExposures: Exposure[] = [
  {
    id: '1',
    title: '某小区内大型犬未牵绳追逐行人',
    description: '今天下午在小区花园看到一个业主遛一只大型犬，完全没有牵绳，狗狗还追逐了一个小孩，太危险了。希望大家引以为戒，外出遛狗一定要牵绳！',
    location: '北京市朝阳区某小区',
    type: '不牵绳',
    author: '热心市民',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    views: 1256,
    dislikes: 234,
    evidenceImages: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 86400000),
    status: '处理中'
  },
  {
    id: '2',
    title: '遛狗时不清理狗狗粪便',
    description: '在公园草坪上发现多处未清理的狗粪，影响环境卫生。希望各位铲屎官养成好习惯，随身携带拾便袋。',
    location: '上海市浦东新区世纪公园',
    type: '随地便溺',
    author: '环保志愿者',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    views: 856,
    dislikes: 156,
    evidenceImages: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 172800000),
    status: '待处理'
  },
  {
    id: '3',
    title: '深夜犬吠扰民严重',
    description: '楼下住户养的狗每到半夜就叫个不停，已经持续一个多月，严重影响睡眠。已向物业反映多次但仍未解决。',
    location: '广州市天河区某小区',
    type: '扰民',
    author: '受影响居民',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    views: 2103,
    dislikes: 445,
    evidenceImages: ['https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 259200000),
    status: '处理中'
  },
  {
    id: '4',
    title: '发现被遗弃的小狗',
    description: '在垃圾堆旁发现一只被遗弃的小狗，看起来才几个月大。希望有爱心人士能够收养，给它一个温暖的家。',
    location: '深圳市南山区',
    type: '遗弃宠物',
    author: '好心人',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    views: 3456,
    dislikes: 89,
    evidenceImages: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 345600000),
    status: '已处理'
  }
];

const Exposure = () => {
  const [exposures] = useState<Exposure[]>(mockExposures);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('全部');

  const types = ['全部', '不牵绳', '随地便溺', '扰民', '遗弃宠物', '其他'];

  const filteredExposures = exposures.filter((exposure) => {
    const matchesSearch = exposure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exposure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === '全部' || exposure.type === activeType;
    return matchesSearch && matchesType;
  });

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
                <h1 className="text-3xl font-bold text-gray-800">文明养宠曝光台</h1>
                <p className="text-gray-500">曝光不文明养宠行为，促进社区和谐</p>
              </div>
            </div>
            <button
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
    </div>
  );
};

export default Exposure;
