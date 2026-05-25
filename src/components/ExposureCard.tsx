import { MapPin, AlertTriangle, Clock, Eye, ThumbsDown } from 'lucide-react';

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

interface ExposureCardProps {
  exposure: Exposure;
  onClick?: () => void;
}

const ExposureCard = ({ exposure, onClick }: ExposureCardProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    return `${days}天前`;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      '不牵绳': 'bg-red-100 text-red-600',
      '随地便溺': 'bg-orange-100 text-orange-600',
      '扰民': 'bg-yellow-100 text-yellow-600',
      '遗弃宠物': 'bg-purple-100 text-purple-600',
      '其他': 'bg-gray-100 text-gray-600'
    };
    return colors[type] || colors['其他'];
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      '待处理': 'bg-yellow-500',
      '处理中': 'bg-blue-500',
      '已处理': 'bg-green-500'
    };
    return colors[status] || colors['待处理'];
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {exposure.evidenceImages && exposure.evidenceImages.length > 0 && (
        <div className="aspect-video overflow-hidden">
          <img
            src={exposure.evidenceImages[0]}
            alt={exposure.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1 text-sm rounded-full font-medium ${getTypeColor(exposure.type)}`}>
              {exposure.type}
            </span>
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock size={14} />
              {formatDate(exposure.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(exposure.status)}`} />
            <span className="text-xs text-gray-500">{exposure.status}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {exposure.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {exposure.description}
        </p>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <MapPin size={16} />
          <span>{exposure.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={exposure.avatar}
              alt={exposure.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{exposure.author}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{exposure.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown size={16} />
              <span>{exposure.dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExposureCard;
