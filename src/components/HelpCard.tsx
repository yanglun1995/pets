import { MapPin, AlertCircle, Clock, Phone } from 'lucide-react';
import { HelpRequest } from '../types';

interface HelpCardProps {
  request: HelpRequest;
  onClick?: () => void;
}

const HelpCard = ({ request, onClick }: HelpCardProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  };

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 4) return 'bg-red-500';
    if (urgency >= 3) return 'bg-orange-500';
    if (urgency >= 2) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = (status: string) => {
    if (status === '紧急') return 'text-red-500 bg-red-50';
    if (status === '进行中') return 'text-primary bg-warm-50';
    return 'text-gray-500 bg-gray-50';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={request.avatar}
            alt={request.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">{request.author}</p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              {formatDate(request.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(request.status)}`}>
            {request.status}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">紧急度:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < request.urgency ? getUrgencyColor(request.urgency) : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-warm-100 text-primary text-xs rounded-full mb-2">
          {request.type}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{request.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{request.description}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <MapPin size={16} />
          <span>{request.location}</span>
        </div>
        <div className="flex items-center gap-2 text-primary text-sm">
          <Phone size={16} />
          <span>联系TA</span>
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
