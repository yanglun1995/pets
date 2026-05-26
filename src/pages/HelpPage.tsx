import { useState } from 'react';
import { Plus, PawPrint, Calendar, Home, User, MapPin } from 'lucide-react';

interface HelpRequest {
  id: string;
  type: 'walk' | 'feed' | 'care' | 'other';
  title: string;
  description: string;
  location: string;
  date: string;
  author: string;
  avatar: string;
  status: 'pending' | 'matched' | 'completed';
  createdAt: Date;
}

const helpRequests: HelpRequest[] = [
  {
    id: '1',
    type: 'walk',
    title: '🐶 寻求帮忙遛狗',
    description: '出差3天，需要有人帮忙遛狗。狗狗很乖，每天早晚各一次就好。',
    location: '香洲区吉大',
    date: '2024-01-15',
    author: '金毛大黄',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    type: 'feed',
    title: '🐱 上门喂养猫咪',
    description: '周末外出，需要有人帮忙喂猫。猫粮在厨房，一天两次。',
    location: '横琴新区',
    date: '2024-01-13',
    author: '橘猫糖糖',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    status: 'matched',
    createdAt: new Date(Date.now() - 7200000)
  },
  {
    id: '3',
    type: 'care',
    title: '🐶 宠物寄养',
    description: '回老家一周，需要寄养狗狗。狗狗疫苗齐全，性格温顺。',
    location: '斗门区井岸',
    date: '2024-01-20',
    author: '柯基妮妮',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    status: 'pending',
    createdAt: new Date(Date.now() - 10800000)
  },
  {
    id: '4',
    type: 'walk',
    title: '🐶 每天帮忙遛狗',
    description: '每天早上7-8点，帮忙遛30分钟。长期需求。',
    location: '香洲区拱北',
    date: '长期',
    author: '泰迪球球',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'completed',
    createdAt: new Date(Date.now() - 14400000)
  },
  {
    id: '5',
    type: 'feed',
    title: '🐱 喂食+换猫砂',
    description: '出差5天，需要每天喂食并清理猫砂。',
    location: '金湾区三灶',
    date: '2024-01-18',
    author: '英短蓝蓝',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop',
    status: 'pending',
    createdAt: new Date(Date.now() - 18000000)
  }
];

const HelpRequestCard = ({ request }: { request: HelpRequest }) => {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'walk': return '🐕';
      case 'feed': return '🍖';
      case 'care': return '🏠';
      default: return '🐾';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'walk': return '帮忙遛狗';
      case 'feed': return '上门喂养';
      case 'care': return '宠物寄养';
      default: return '其他帮助';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return '待匹配';
      case 'matched': return '已匹配';
      case 'completed': return '已完成';
      default: return '未知';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'matched': return 'bg-blue-100 text-blue-600';
      case 'completed': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
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
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={request.avatar} 
            alt={request.author}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(request.status)} rounded-full flex items-center justify-center text-xs font-bold`}>
            {request.status === 'pending' && '待'}
            {request.status === 'matched' && '配'}
            {request.status === 'completed' && '完'}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{getTypeIcon(request.type)}</span>
            <h3 className="font-bold text-gray-800">{request.title}</h3>
          </div>
          
          <p className="text-gray-500 text-sm line-clamp-2">{request.description}</p>
          
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {request.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {request.date}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{request.author}</span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">{formatTime(request.createdAt)}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
              {getStatusLabel(request.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('walk');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });

  const types = [
    { value: 'walk', label: '帮忙遛狗', icon: '🐕' },
    { value: 'feed', label: '上门喂养', icon: '🍖' },
    { value: 'care', label: '宠物寄养', icon: '🏠' },
    { value: 'other', label: '其他帮助', icon: '🐾' }
  ];

  const filteredRequests = helpRequests;

  const handleSubmit = () => {
    setShowModal(false);
    alert('发布成功！等待好心人接单~');
    setFormData({ title: '', description: '', location: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <span className="text-3xl">❤️</span>
            养宠互助
          </h1>
          <p className="text-gray-500 text-sm mt-1">发布求助或帮助他人</p>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-3xl p-5 mb-5 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <PawPrint size={28} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">需要帮助？</p>
              <p className="text-white/80 text-sm">发布你的求助需求，让更多人看到</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-3.5 bg-white text-pink-500 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            发布互助需求
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-gray-400 text-sm font-medium px-3">求助列表</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <HelpRequestCard key={request.id} request={request} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🐕</div>
            <p className="text-xl font-bold text-gray-800">23</p>
            <p className="text-xs text-gray-500">遛狗需求</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🍖</div>
            <p className="text-xl font-bold text-gray-800">15</p>
            <p className="text-xs text-gray-500">喂养需求</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🏠</div>
            <p className="text-xl font-bold text-gray-800">8</p>
            <p className="text-xs text-gray-500">寄养需求</p>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-5 rounded-t-3xl">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus size={24} />
                发布互助需求
              </h2>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">选择类型</label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedType === type.value 
                          ? 'border-pink-500 bg-pink-50' 
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <span className="text-xl">{type.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{type.label}</span>
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="简要描述你的需求..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  placeholder="详细说明你的需求..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">位置</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="所在区域"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="如：2024-01-15"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                发布需求
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPage;
