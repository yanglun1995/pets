import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  onClick?: () => void;
}

const EventCard = ({ event, onRegister, onClick }: EventCardProps) => {
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    return `${month}月${day}日 ${weekday}`;
  };

  const progress = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
            {event.status}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{event.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={16} className="text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={16} className="text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-gray-500">
              <Users size={14} />
              {event.currentParticipants}/{event.maxParticipants}人
            </span>
            <span className="text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRegister?.(event.id);
          }}
          disabled={event.currentParticipants >= event.maxParticipants}
          className={`w-full py-2.5 rounded-xl font-medium transition-all ${
            event.currentParticipants >= event.maxParticipants
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-warm-600'
          }`}
        >
          {event.currentParticipants >= event.maxParticipants ? '名额已满' : '立即报名'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
