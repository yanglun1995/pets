import { Heart, MessageCircle, Clock } from 'lucide-react';
import { ExchangePost } from '../types';

interface ExchangeCardProps {
  post: ExchangePost;
  onLike?: (postId: string) => void;
  onClick?: () => void;
}

const ExchangeCard = ({ post, onLike, onClick }: ExchangeCardProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    return `${days}天前`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-warm-100 text-primary text-sm rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock size={14} />
            {formatDate(post.createdAt)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {post.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.(post.id);
              }}
              className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
            >
              <Heart size={16} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircle size={16} />
              <span className="text-sm">{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
