import { Calendar, Plus, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import EventCard from '../components/EventCard';

const Events = () => {
  const navigate = useNavigate();
  const { events, registerEvent, addEvent } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    maxParticipants: 50,
    date: '',
    image: '',
    organizer: ''
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
    if (formData.title && formData.description && formData.location && formData.date && formData.organizer) {
      addEvent({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        maxParticipants: formData.maxParticipants,
        date: new Date(formData.date),
        image: formData.image || 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=400&fit=crop',
        organizer: formData.organizer,
        status: '报名中'
      });
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        maxParticipants: 50,
        date: '',
        image: '',
        organizer: ''
      });
      setPreviewImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-warm-500 rounded-full flex items-center justify-center shadow-lg">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">宠物活动</h1>
                <p className="text-gray-500">发现精彩的宠物活动，认识更多小伙伴</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-warm-500 text-white rounded-xl font-medium hover:from-warm-500 hover:to-primary transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              发布活动
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={registerEvent}
                onClick={() => navigate(`/post/event/${event.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-gray-500 text-lg">暂无活动，敬请期待</p>
          </div>
        )}
      </div>

      {/* 发布活动 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-warm-500 text-white p-4 md:p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">发布活动</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setPreviewImage(null);
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                  placeholder="例如：周末宠物公园聚会"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                  placeholder="详细描述活动内容、时间安排等"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    活动地点 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                    placeholder="例如：上海世纪公园"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    活动日期 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主办方/组织者 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                    placeholder="例如：宠互助社区"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大参与人数
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动图片（可选）
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
                      <p className="text-gray-600 text-sm md:text-base">点击或拖拽上传图片</p>
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

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setPreviewImage(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-base"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-warm-500 text-white rounded-xl font-medium hover:from-warm-500 hover:to-primary transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-base"
                >
                  发布活动
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
