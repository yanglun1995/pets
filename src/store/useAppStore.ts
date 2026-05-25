import { create } from 'zustand';
import { ExchangePost, HelpRequest, Event } from '../types';

interface AppStore {
  exchangePosts: ExchangePost[];
  helpRequests: HelpRequest[];
  events: Event[];
  addExchangePost: (post: Omit<ExchangePost, 'id' | 'createdAt'>) => void;
  addHelpRequest: (request: Omit<HelpRequest, 'id' | 'createdAt'>) => void;
  likeExchangePost: (postId: string) => void;
  registerEvent: (eventId: string) => void;
}

const initialExchangePosts: ExchangePost[] = [
  {
    id: '1',
    title: '我家柯基的健康食谱分享',
    content: '分享一下我家小柯基的健康饮食方案，包括主食、零食和营养补充，希望对大家有帮助！',
    author: '小柯基妈妈',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    category: '饮食健康',
    likes: 128,
    comments: 32,
    createdAt: new Date(Date.now() - 86400000),
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'
  },
  {
    id: '2',
    title: '狗狗训练心得分享',
    content: '最近在训练我家金毛坐下和握手，分享一下我的训练方法和心得，大家一起交流！',
    author: '金毛爱好者',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    category: '训练教育',
    likes: 89,
    comments: 21,
    createdAt: new Date(Date.now() - 172800000),
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop'
  },
  {
    id: '3',
    title: '猫咪绝育后的护理',
    content: '刚带家里的猫主子去做了绝育，分享一下术后护理的注意事项和经验。',
    author: '猫奴一枚',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    category: '医疗护理',
    likes: 256,
    comments: 67,
    createdAt: new Date(Date.now() - 259200000),
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop'
  }
];

const initialHelpRequests: HelpRequest[] = [
  {
    id: '1',
    title: '求推荐靠谱的宠物医院',
    description: '刚搬到这个区，想找一家靠谱的宠物医院，麻烦大家推荐一下！',
    type: '资源寻找',
    location: '上海市浦东新区',
    author: '新养宠人',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    contact: '138****8888',
    urgency: 2,
    status: '进行中',
    createdAt: new Date(Date.now() - 43200000)
  },
  {
    id: '2',
    title: '临时需要帮忙照顾狗狗3天',
    description: '临时出差，需要有人帮忙照顾我家柯基3天，有偿，有经验优先！',
    type: '临时托管',
    location: '北京市朝阳区',
    author: '出差的铲屎官',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    contact: '微信：xxx123',
    urgency: 3,
    status: '进行中',
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    title: '寻找走失的橘猫',
    description: '我家大橘昨天下午走失了，身上有橘白花纹，看到的请联系我！',
    type: '寻宠启事',
    location: '广州市天河区',
    author: '焦急的铲屎官',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    contact: '电话：139****9999',
    urgency: 5,
    status: '紧急',
    createdAt: new Date(Date.now() - 21600000)
  }
];

const initialEvents: Event[] = [
  {
    id: '1',
    title: '周末宠物友好公园聚会',
    description: '本周六下午，带毛孩子一起去公园玩耍吧！大家互相认识交流，还有小游戏哦！',
    date: new Date(Date.now() + 86400000 * 2),
    location: '上海世纪公园',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=400&fit=crop',
    maxParticipants: 30,
    currentParticipants: 18,
    organizer: '宠互助社区',
    status: '报名中',
    createdAt: new Date(Date.now() - 432000000)
  },
  {
    id: '2',
    title: '宠物健康知识讲座',
    description: '邀请专业兽医为大家讲解宠物日常健康护理知识，免费参加！',
    date: new Date(Date.now() + 86400000 * 7),
    location: '北京朝阳区宠物会所',
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&h=400&fit=crop',
    maxParticipants: 50,
    currentParticipants: 35,
    organizer: '宠互助社区',
    status: '报名中',
    createdAt: new Date(Date.now() - 518400000)
  }
];

export const useAppStore = create<AppStore>((set) => ({
  exchangePosts: initialExchangePosts,
  helpRequests: initialHelpRequests,
  events: initialEvents,
  addExchangePost: (post) =>
    set((state) => ({
      exchangePosts: [
        {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date()
        },
        ...state.exchangePosts
      ]
    })),
  addHelpRequest: (request) =>
    set((state) => ({
      helpRequests: [
        {
          ...request,
          id: Date.now().toString(),
          createdAt: new Date()
        },
        ...state.helpRequests
      ]
    })),
  likeExchangePost: (postId) =>
    set((state) => ({
      exchangePosts: state.exchangePosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    })),
  registerEvent: (eventId) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId && event.currentParticipants < event.maxParticipants
          ? { ...event, currentParticipants: event.currentParticipants + 1 }
          : event
      )
    }))
}));
