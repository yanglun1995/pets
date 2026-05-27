import { useState } from 'react';
import { MapPin, Clock, MessageCircle, Navigation, RefreshCw, User, Dog, Cat, Send, X, PawPrint } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';
import { useUserStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const NearbyDogCard = ({ dog, onClick }: { dog: any; onClick: () => void }) => {
  const formatDistance = (distance: number) => {
    if (distance < 1) return `${Math.round(distance * 1000)}米`;
    return `${distance}公里`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return '刚刚在线';
    if (minutes < 60) return `${minutes}分钟前在线`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前在线`;
    return '今天在线';
  };

  const breedEmoji = (breed: string) => {
    if (breed.includes('柯基')) return '🐶';
    if (breed.includes('柴犬')) return '🦊';
    if (breed.includes('金毛') || breed.includes('拉布拉多')) return '🐕';
    if (breed.includes('橘猫')) return '🐱';
    if (breed.includes('英短') || breed.includes('蓝猫')) return '😺';
    if (breed.includes('布偶')) return '😻';
    return '🐾';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={dog.avatar} 
            alt={dog.name}
            className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-800 text-lg">{dog.name}</h3>
            <span className="text-xl">{breedEmoji(dog.breed)}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              dog.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
            }`}>
              {dog.gender === 'male' ? '♂ 公' : '♀ 母'}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm font-medium">{dog.breed} · {dog.age}岁</p>
          
          <div className="flex items-center gap-2 mt-2 text-pink-500 text-sm">
            <MapPin size={16} />
            <span className="font-medium">{dog.location}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
            <Clock size={14} />
            <span>{formatTime(dog.lastSeen)}</span>
            <span className="mx-1">·</span>
            <span className="font-medium text-purple-500">{formatDistance(dog.distance)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <img 
            src={dog.ownerAvatar} 
            alt={dog.owner}
            className="w-7 h-7 rounded-full object-cover border-2 border-pink-100"
          />
          <span className="text-sm text-gray-600 font-medium">{dog.owner}</span>
        </div>
        
        <button className="px-5 py-2.5 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
          <MessageCircle size={16} />
          打招呼
        </button>
      </div>
    </div>
  );
};

const NearbyDogs = () => {
  const { nearbyDogs, addNearbyDog } = useFeedStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [selectedDog, setSelectedDog] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('全部');
  const [walkMode, setWalkMode] = useState(false);
  const [showGreetModal, setShowGreetModal] = useState(false);
  const [greetMessage, setGreetMessage] = useState('');
  const [greetedDogs, setGreetedDogs] = useState<string[]>([]);
  const [greetSent, setGreetSent] = useState('');
  const [showAddDogModal, setShowAddDogModal] = useState(false);
  const [newDog, setNewDog] = useState({
    name: '',
    breed: '柯基',
    age: '1',
    gender: 'female' as const,
    location: '十字门',
    distance: 0.5
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleWalkToggle = () => {
    if (!walkMode) {
      if (!currentUser) {
        alert('请先注册或登录后再使用遛狗模式！');
        return;
      }
      const userDog = {
        id: 'my-dog-' + Date.now(),
        name: currentUser.username + '的狗',
        avatar: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=200&h=200&fit=crop',
        breed: '柯基',
        age: 3,
        gender: 'female' as const,
        distance: 0,
        location: '当前位置',
        lastSeen: new Date(),
        owner: currentUser.username,
        ownerAvatar: currentUser.avatar
      };
      addNearbyDog(userDog);
    }
    setWalkMode(!walkMode);
  };

  const handleGreet = (dog: any) => {
    if (!currentUser) {
      alert('请先注册或登录再打招呼！');
      return;
    }
    setSelectedDog(dog);
    setShowGreetModal(true);
    setGreetSent('');
    setGreetMessage('');
  };

  const sendGreet = () => {
    const msg = greetMessage.trim() || `你好！我是${currentUser?.username || '邻居'}，想和你家狗狗一起玩~`;
    setGreetedDogs([...greetedDogs, selectedDog.id]);
    setGreetSent(msg);
    setShowGreetModal(false);
    setTimeout(() => {
      setGreetSent('');
    }, 3000);
  };

  const sortedDogs = [...nearbyDogs].sort((a, b) => a.distance - b.distance);

  const filteredDogs = activeFilter === '全部' ? sortedDogs
    : activeFilter === '狗狗' ? sortedDogs.filter(d => 
        d.breed.includes('柯基') || d.breed.includes('柴犬') || d.breed.includes('金毛') || d.breed.includes('拉布拉多') || d.breed.includes('泰迪') || d.breed.includes('西高地') || d.breed.includes('博美'))
    : sortedDogs.filter(d => 
        d.breed.includes('猫') || d.breed.includes('英短') || d.breed.includes('布偶') || d.breed.includes('橘猫'));

  const breedEmoji = (breed: string) => {
    if (breed.includes('柯基')) return '🐶';
    if (breed.includes('柴犬')) return '🦊';
    if (breed.includes('金毛') || breed.includes('拉布拉多')) return '🐕';
    if (breed.includes('橘猫')) return '🐱';
    if (breed.includes('英短') || breed.includes('蓝猫')) return '😺';
    if (breed.includes('布偶')) return '😻';
    return '🐾';
  };

  const handleAddDog = () => {
    if (!newDog.name.trim()) {
      alert('请输入狗狗名字');
      return;
    }
    addNearbyDog({
      id: 'user-' + Date.now(),
      name: newDog.name,
      avatar: 'https://images.unsplash.com/photo-1558929996-da64ba858215?w=200&h=200&fit=crop',
      breed: newDog.breed,
      age: parseInt(newDog.age),
      gender: newDog.gender,
      distance: newDog.distance,
      location: newDog.location,
      lastSeen: new Date(),
      owner: currentUser?.username || '匿名用户',
      ownerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    });
    setShowAddDogModal(false);
    setNewDog({ name: '', breed: '柯基', age: '1', gender: 'female', location: '十字门', distance: 0.5 });
    alert('狗狗已添加到附近列表！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                <span className="text-3xl">🐕</span>
                附近遛狗
              </h1>
              <p className="text-gray-500 text-sm mt-1">找到附近一起遛狗的小伙伴</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-3 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors shadow-sm"
            >
              <RefreshCw size={20} className={`text-pink-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-full p-1">
            {['全部', '狗狗', '猫咪'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeFilter === filter 
                    ? 'bg-white text-pink-500 shadow-md' 
                    : 'text-gray-600'
                }`}
              >
                {filter === '全部' && '🐾 '}
                {filter === '狗狗' && '🦊 '}
                {filter === '猫咪' && '🐱 '}
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {greetSent && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium text-center animate-bounce">
            ✅ 已向对方发送打招呼消息：{greetSent}
          </div>
        )}

        <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-3xl p-5 mb-5 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Navigation size={28} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">{walkMode ? '正在遛狗中...' : '开启遛狗模式'}</p>
              <p className="text-white/80 text-sm">
                {walkMode ? '你的狗已在附近列表中' : '让附近的小伙伴看到你和狗狗！'}
              </p>
            </div>
            {walkMode && (
              <div className="w-4 h-4 bg-green-400 rounded-full animate-ping" />
            )}
          </div>
          <button 
            onClick={handleWalkToggle}
            className={`w-full py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2 ${
              walkMode 
                ? 'bg-red-50 text-red-500' 
                : 'bg-white text-pink-500'
            }`}
          >
            {walkMode ? (
              <>⏹ 停止遛狗</>
            ) : (
              <>🐕 我在遛狗，找小伙伴一起玩</>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-gray-400 text-sm font-medium px-3">
            附近 {filteredDogs.length} 只毛孩子
            {activeFilter !== '全部' && ` (${activeFilter})`}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <div className="space-y-4">
          {filteredDogs.map((dog) => (
            <div key={dog.id} className="relative">
              {greetedDogs.includes(dog.id) && (
                <div className="absolute -top-2 right-4 z-10 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                  已打招呼 ✓
                </div>
              )}
              <NearbyDogCard 
                dog={dog}
                onClick={() => setSelectedDog(dog)}
              />
            </div>
          ))}
          {filteredDogs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Dog size={48} className="mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium mb-2">附近暂无毛孩子</p>
              <p className="text-sm">开启遛狗模式或者添加狗狗信息吧！</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowAddDogModal(true)}
          className="w-full mt-6 py-3.5 bg-white border-2 border-dashed border-pink-300 text-pink-500 rounded-2xl font-bold hover:bg-pink-50 transition-all flex items-center justify-center gap-2"
        >
          <PawPrint size={20} />
          添加我的狗狗信息
        </button>
      </main>

      {selectedDog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setSelectedDog(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedDog.avatar} 
                alt={selectedDog.name}
                className="w-full h-56 object-cover"
              />
              <button 
                onClick={() => setSelectedDog(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                <span className="text-xl">{breedEmoji(selectedDog.breed)}</span>
                <span>{selectedDog.breed}</span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={selectedDog.avatar} 
                  alt={selectedDog.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl -mt-12 relative z-10"
                />
                <div>
                  <h3 className="text-2xl font-black text-gray-800">{selectedDog.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedDog.breed} · {selectedDog.age}岁 · {selectedDog.gender === 'male' ? '公' : '母'}</p>
                  {greetedDogs.includes(selectedDog.id) && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-600 px-2.5 py-0.5 rounded-full font-medium">
                      已打招呼 ✓
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-pink-500">
                    {selectedDog.distance < 1 ? `${Math.round(selectedDog.distance * 1000)}m` : `${selectedDog.distance}km`}
                  </p>
                  <p className="text-xs text-gray-500">距离</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-500">
                    {selectedDog.gender === 'male' ? '♂' : '♀'}
                  </p>
                  <p className="text-xs text-gray-500">性别</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-500">{selectedDog.age}岁</p>
                  <p className="text-xs text-gray-500">年龄</p>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <MapPin size={18} className="text-pink-400" />
                  <span className="text-sm font-medium">{selectedDog.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <User size={18} className="text-purple-400" />
                  <span className="text-sm font-medium">主人：{selectedDog.owner}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  查看主页
                </button>
                <button 
                  onClick={() => handleGreet(selectedDog)}
                  className={`flex-1 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                    greetedDogs.includes(selectedDog.id)
                      ? 'bg-green-100 text-green-600 border border-green-300'
                      : 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                  }`}
                >
                  <MessageCircle size={18} />
                  {greetedDogs.includes(selectedDog.id) ? '已打招呼' : '打招呼'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showGreetModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGreetModal(false)}>
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-5 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <MessageCircle size={20} />
                  和 {selectedDog?.name} 打招呼
                </h3>
                <button onClick={() => setShowGreetModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <img src={selectedDog?.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-gray-800">{selectedDog?.name}</p>
                  <p className="text-xs text-gray-500">{selectedDog?.breed}</p>
                </div>
              </div>
              <textarea
                value={greetMessage}
                onChange={(e) => setGreetMessage(e.target.value)}
                placeholder={`嗨~ 我在附近遛狗，想和${selectedDog?.name}一起玩！`}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all resize-none"
                rows={3}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowGreetModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={sendGreet}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  发送问候
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddDogModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddDogModal(false)}>
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <PawPrint size={20} />
                  添加我的狗狗
                </h3>
                <button onClick={() => setShowAddDogModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">名字</label>
                <input
                  type="text"
                  value={newDog.name}
                  onChange={(e) => setNewDog({...newDog, name: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                  placeholder="如：妮妮"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">品种</label>
                <select
                  value={newDog.breed}
                  onChange={(e) => setNewDog({...newDog, breed: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                >
                  <option>柯基</option>
                  <option>柴犬</option>
                  <option>金毛</option>
                  <option>拉布拉多</option>
                  <option>泰迪</option>
                  <option>西高地</option>
                  <option>博美</option>
                  <option>橘猫</option>
                  <option>布偶猫</option>
                  <option>英短</option>
                </select>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">年龄</label>
                  <input
                    type="number"
                    value={newDog.age}
                    onChange={(e) => setNewDog({...newDog, age: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                    min={0}
                    max={30}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">性别</label>
                  <select
                    value={newDog.gender}
                    onChange={(e) => setNewDog({...newDog, gender: e.target.value as 'male' | 'female'})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                  >
                    <option value="female">♀ 女孩</option>
                    <option value="male">♂ 男孩</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">位置</label>
                <input
                  type="text"
                  value={newDog.location}
                  onChange={(e) => setNewDog({...newDog, location: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                  placeholder="如：十字门"
                />
              </div>
              <button
                onClick={handleAddDog}
                className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                ✅ 添加狗狗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyDogs;