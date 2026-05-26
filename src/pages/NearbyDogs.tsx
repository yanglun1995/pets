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

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={dog.avatar} 
            alt={dog.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800">{dog.name}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              dog.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
            }`}>
              {dog.gender === 'male' ? '公' : '母'}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm">{dog.breed} · {dog.age}岁</p>
          
          <div className="flex items-center gap-2 mt-2 text-primary text-sm">
            <MapPin size={14} />
            <span>{dog.location}</span>
            <span className="text-gray-300">·</span>
            <span>{formatDistance(dog.distance)}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
            <Clock size={12} />
            <span>{formatTime(dog.lastSeen)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <img 
            src={dog.ownerAvatar} 
            alt={dog.owner}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-600">{dog.owner}</span>
        </div>
        
        <button className="px-4 py-2 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all">
          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            打招呼
          </span>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">附近的小伙伴</h1>
              <p className="text-gray-500 text-sm">找到附近一起遛狗的小伙伴</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="flex items-center gap-4 bg-gray-100 rounded-full p-1">
            <button className="flex-1 py-2.5 bg-white rounded-full text-sm font-medium text-primary shadow-sm">
              全部
            </button>
            <button className="flex-1 py-2.5 text-sm font-medium text-gray-600">
              公犬
            </button>
            <button className="flex-1 py-2.5 text-sm font-medium text-gray-600">
              母犬
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="bg-gradient-to-r from-primary to-purple-500 rounded-2xl p-4 mb-4 text-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <Navigation size={24} />
            </div>
            <div>
              <p className="font-semibold">开启遛狗模式</p>
              <p className="text-white/80 text-sm">点击下方按钮，让附近的小伙伴看到你</p>
            </div>
          </div>
          <button className="w-full mt-4 py-3 bg-white text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            我在遛狗，找小伙伴一起玩
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">附近 {sortedDogs.length} 只狗狗</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-3">
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
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedDog.avatar} 
                alt={selectedDog.name}
                className="w-full h-48 object-cover"
              />
              <button 
                onClick={() => setSelectedDog(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={selectedDog.avatar} 
                  alt={selectedDog.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg -mt-8 relative z-10"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedDog.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedDog.breed} · {selectedDog.age}岁</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{selectedDog.distance < 1 ? `${Math.round(selectedDog.distance * 1000)}米` : `${selectedDog.distance}公里`}</p>
                  <p className="text-xs text-gray-500">距离</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-500">{selectedDog.gender === 'male' ? '公' : '母'}</p>
                  <p className="text-xs text-gray-500">性别</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-500">在线</p>
                  <p className="text-xs text-gray-500">状态</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-sm">{selectedDog.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={16} className="text-gray-400" />
                  <span className="text-sm">主人：{selectedDog.owner}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all">
                  查看主页
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
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
