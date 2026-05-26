import { useState } from 'react';
import { ArrowLeft, Image, Video, X, MapPin, AtSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFeedStore } from '../store/useFeedStore';

const CreatePost = () => {
  const navigate = useNavigate();
  const { addFeedPost, addVideoPost, currentPetProfile } = useFeedStore();
  const [postType, setPostType] = useState<'image' | 'video'>('image');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const sampleImages = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop'
  ];

  const handlePost = () => {
    if (!content.trim()) {
      alert('请输入内容');
      return;
    }

    setIsPosting(true);

    const profile = currentPetProfile || {
      name: '妮妮',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
    };

    if (postType === 'image') {
      addFeedPost({
        type: 'image',
        title: title || '分享我的宠物~',
        content,
        image: selectedImage || sampleImages[0],
        author: profile.name,
        avatar: profile.avatar,
        likes: 0,
        comments: 0,
        tags: [],
        category: '萌宠'
      });
    } else {
      addVideoPost({
        title: title || '分享我的宠物视频~',
        description: content,
        videoUrl: '',
        thumbnail: selectedImage || sampleImages[0],
        author: profile.name,
        avatar: profile.avatar,
        likes: 0,
        comments: 0,
        views: 0,
        tags: []
      });
    }

    setTimeout(() => {
      setIsPosting(false);
      navigate('/');
    }, 1000);
  };

  const suggestedTags = ['#柯基', '#柴犬', '#猫咪', '#金毛', '#萌宠', '#可爱', '#珠海'];

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="sticky top-0 bg-white z-50 border-b border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">发布</h1>
          <button
            onClick={handlePost}
            disabled={!content.trim() || isPosting}
            className="px-5 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPosting ? '发布中...' : '发布'}
          </button>
        </div>
      </header>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <img 
            src={currentPetProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 mb-1">
              {currentPetProfile?.name || '妮妮'}
            </p>
            <p className="text-xs text-gray-500">公开</p>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享你家宠物的精彩瞬间~"
          className="w-full h-40 resize-none border-none focus:outline-none text-gray-800 placeholder-gray-400 text-base leading-relaxed"
        />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="添加标题（可选）"
          className="w-full border-b border-gray-200 py-2 focus:outline-none text-gray-800 placeholder-gray-400"
        />

        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setPostType('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                postType === 'image'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Image size={18} />
              <span className="text-sm font-medium">图文</span>
            </button>
            <button
              onClick={() => setPostType('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                postType === 'video'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Video size={18} />
              <span className="text-sm font-medium">视频</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {sampleImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedImage === img
                    ? 'ring-4 ring-pink-500 transform scale-95'
                    : 'hover:opacity-80'
                }`}
              >
                <img src={img} alt={`选项${idx + 1}`} className="w-full h-full object-cover" />
                {selectedImage === img && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedImage && (
            <div className="relative mb-4">
              <img 
                src={selectedImage} 
                alt="预览"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500 mb-2">添加标签</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (!content.includes(tag)) {
                    setContent(content + ' ' + tag);
                  }
                }}
                className="px-3 py-1.5 bg-pink-50 text-pink-500 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <MapPin size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">添加位置</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <AtSign size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">@好友</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
