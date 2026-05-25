import { Calendar } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import EventCard from '../components/EventCard';

const Events = () => {
  const { events, registerEvent } = useAppStore();

  return (
    <div className="min-h-screen bg-warm-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">宠物活动</h1>
              <p className="text-gray-500">发现精彩的宠物活动，认识更多小伙伴</p>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={registerEvent}
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
    </div>
  );
};

export default Events;
