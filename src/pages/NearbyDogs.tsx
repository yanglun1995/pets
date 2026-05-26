import { useState } from 'react';
import { MapPin, Clock, MessageCircle, Navigation, RefreshCw, User } from 'lucide-react';
import { useFeedStore } from '../store/useFeedStore';

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
  const { nearbyDogs } = useFeedStore();
  const [selectedDog, setSelectedDog] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const sortedDogs = [...nearbyDogs].sort((a, b) => a.distance - b.distance);

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
            <button className="flex-1 py-2.5 bg-white rounded-full text-sm font-bold text-pink-500 shadow-md">
              🐾 全部
            </button>
            <button className="flex-1 py-2.5 text-sm font-medium text-gray-600">
              🦊 狗狗
            </button>
            <button className="flex-1 py-2.5 text-sm font-medium text-gray-600">
              🐱 猫咪
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-3xl p-5 mb-5 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Navigation size={28} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">开启遛狗模式</p>
              <p className="text-white/80 text-sm">让附近的小伙伴看到你！</p>
            </div>
          </div>
          <button className="w-full py-3.5 bg-white text-pink-500 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-base">
            🐕 我在遛狗，找小伙伴一起玩
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          <span className="text-gray-400 text-sm font-medium px-3">附近 {sortedDogs.length} 只毛孩子</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        <div className="space-y-4">
          {sortedDogs.map((dog) => (
            <NearbyDogCard 
              key={dog.id} 
              dog={dog}
              onClick={() => setSelectedDog(dog)}
            />
          ))}
        </div>
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
                ✕
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
                  <p className="text-lg font-bold text-green-500">在线</p>
                  <p className="text-xs text-gray-500">状态</p>
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
                <button className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all">
                  查看主页
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  打招呼
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyDogs;
