import { useState } from 'react';
import { Plus, PawPrint, Calendar, Home, User, MapPin, X, Clock, MessageCircle } from 'lucide-react';

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
  price: number | null;
}

const westieAvatar = 'https://images.unsplash.com/photo-1568043210943-0e8c6dde0f90?w=100&h=100&fit=crop';
const goldenAvatar = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop';
const catAvatar = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop';
const teddyAvatar = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop';
const britishAvatar = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop';

const helpRequests: HelpRequest[] = [
  {
    id: '1',
    type: 'walk',
    title: '🐶 寻求帮忙遛狗',
    description: '出差3天，需要有人帮忙遛狗。狗狗很乖，每天早晚各一次就好。狗狗叫大黄，是一只3岁的金毛犬，性格温顺，不会咬人。',
    location: '香洲区吉大',
    date: '2024-01-15',
    author: '金毛大黄',
    avatar: goldenAvatar,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000),
    price: 30
  },
  {
    id: '2',
    type: 'feed',
    title: '🐱 上门喂养猫咪',
    description: '周末外出，需要有人帮忙喂猫。猫粮在厨房，一天两次。猫咪叫糖糖，是一只橘猫，很亲人。',
    location: '横琴新区',
    date: '2024-01-13',
    author: '橘猫糖糖',
    avatar: catAvatar,
    status: 'matched',
    createdAt: new Date(Date.now() - 7200000),
    price: null
  },
  {
    id: '3',
    type: 'care',
    title: '🐶 宠物寄养',
    description: '回老家一周，需要寄养狗狗。狗狗疫苗齐全，性格温顺。狗狗叫小白，是一只可爱的西高地白梗。',
    location: '斗门区井岸',
    date: '2024-01-20',
    author: '西高地小白',
    avatar: westieAvatar,
    status: 'pending',
    createdAt: new Date(Date.now() - 10800000),
    price: 50
  },
  {
    id: '4',
    type: 'walk',
    title: '🐶 每天帮忙遛狗',
    description: '每天早上7-8点，帮忙遛30分钟。长期需求。狗狗叫球球，是一只泰迪犬。',
    location: '香洲区拱北',
    date: '长期',
    author: '泰迪球球',
    avatar: teddyAvatar,
    status: 'completed',
    createdAt: new Date(Date.now() - 14400000),
    price: null
  },
  {
    id: '5',
    type: 'feed',
    title: '🐱 喂食+换猫砂',
    description: '出差5天，需要每天喂食并清理猫砂。猫咪叫蓝蓝，是一只英短蓝猫。',
    location: '金湾区三灶',
    date: '2024-01-18',
    author: '英短蓝蓝',
    avatar: britishAvatar,
    status: 'pending',
    createdAt: new Date(Date.now() - 18000000),
    price: 25
  }
];

const HelpRequestCard = ({ request, onClick }: { request: HelpRequest; onClick: () => void }) => {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'walk': return '🐕';
      case 'feed': return '🍖';
      case 'care': return '🏠';
      default: return '🐾';
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
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer"
    >
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
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                {getStatusLabel(request.status)}
              </span>
              {request.price !== null ? (
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                  ¥{request.price}
                </span>
              ) : (
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                  免费
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [selectedType, setSelectedType] = useState('walk');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
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

  const walkCount = helpRequests.filter(r => r.type === 'walk').length;
  const feedCount = helpRequests.filter(r => r.type === 'feed').length;
  const careCount = helpRequests.filter(r => r.type === 'care').length;

  const handleSubmit = () => {
    setShowModal(false);
    alert('发布成功！等待好心人接单~');
    setFormData({ title: '', description: '', location: '', date: '' });
    setIsFree(true);
    setPrice('');
  };

  const handleCardClick = (request: HelpRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'walk': return '🐕';
      case 'feed': return '🍖';
      case 'care': return '🏠';
      default: return '🐾';
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
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🐕</div>
            <p className="text-xl font-bold text-gray-800">{walkCount}</p>
            <p className="text-xs text-gray-500">遛狗需求</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🍖</div>
            <p className="text-xl font-bold text-gray-800">{feedCount}</p>
            <p className="text-xs text-gray-500">喂养需求</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-3xl mb-2">🏠</div>
            <p className="text-xl font-bold text-gray-800">{careCount}</p>
            <p className="text-xs text-gray-500">寄养需求</p>
          </div>
        </div>

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
            <HelpRequestCard 
              key={request.id} 
              request={request}
              onClick={() => handleCardClick(request)}
            />
          ))}
        </div>
      </main>

      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-0 sm:p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-5 sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {getTypeIcon(selectedRequest.type)}
                  {selectedRequest.title}
                </h2>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={selectedRequest.avatar} 
                  alt={selectedRequest.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-800 text-lg">{selectedRequest.author}</p>
                  <p className="text-gray-500 text-sm">发布于 {selectedRequest.date}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700 leading-relaxed">{selectedRequest.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-pink-400" />
                  <span className="font-medium">{selectedRequest.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} className="text-purple-400" />
                  <span className="font-medium">需求日期：{selectedRequest.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={18} className="text-blue-400" />
                  <span className="font-medium">发布时间：{new Date(selectedRequest.createdAt).toLocaleString('zh-CN')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 py-4 border-y border-gray-100">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(selectedRequest.status)}`}>
                  {getStatusLabel(selectedRequest.status)}
                </span>
                {selectedRequest.price !== null ? (
                  <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-sm font-bold">
                    💰 ¥{selectedRequest.price}
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full text-sm font-bold">
                    🆓 免费
                  </span>
                )}
              </div>

              <button className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-4">
                <MessageCircle size={20} />
                联系求助者
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-0 sm:p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-5 sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Plus size={24} />
                  发布互助需求
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">报酬方式</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFree(true)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                      isFree ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    🆓 免费
                  </button>
                  <button
                    onClick={() => setIsFree(false)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                      !isFree ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    💰 付费
                  </button>
                </div>
              </div>

              {!isFree && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">金额（元）</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="输入金额"
                  />
                </div>
              )}

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
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all mb-4"
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
