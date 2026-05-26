import { create } from 'zustand';
import { ExchangePost, HelpRequest, Event, Exposure, FeedPost } from '../types';

interface AppStore {
  exchangePosts: ExchangePost[];
  helpRequests: HelpRequest[];
  events: Event[];
  exposures: Exposure[];
  feedPosts: FeedPost[];
  addExchangePost: (post: Omit<ExchangePost, 'id' | 'createdAt'>) => void;
  addHelpRequest: (request: Omit<HelpRequest, 'id' | 'createdAt'>) => void;
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'currentParticipants'>) => void;
  addExposure: (exposure: Omit<Exposure, 'id' | 'createdAt' | 'views' | 'dislikes'>) => void;
  addFeedPost: (post: Omit<FeedPost, 'id' | 'createdAt'>) => void;
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

const initialExposures: Exposure[] = [
  {
    id: '1',
    title: '某小区内大型犬未牵绳追逐行人',
    description: '今天下午在小区花园看到一个业主遛一只大型犬，完全没有牵绳，狗狗还追逐了一个小孩，太危险了。希望大家引以为戒，外出遛狗一定要牵绳！',
    location: '北京市朝阳区某小区',
    type: '不牵绳',
    author: '热心市民',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    views: 1256,
    dislikes: 234,
    evidenceImages: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 86400000),
    status: '处理中'
  },
  {
    id: '2',
    title: '遛狗时不清理狗狗粪便',
    description: '在公园草坪上发现多处未清理的狗粪，影响环境卫生。希望各位铲屎官养成好习惯，随身携带拾便袋。',
    location: '上海市浦东新区世纪公园',
    type: '随地便溺',
    author: '环保志愿者',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    views: 856,
    dislikes: 156,
    evidenceImages: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 172800000),
    status: '待处理'
  },
  {
    id: '3',
    title: '深夜犬吠扰民严重',
    description: '楼下住户养的狗每到半夜就叫个不停，已经持续一个多月，严重影响睡眠。已向物业反映多次但仍未解决。',
    location: '广州市天河区某小区',
    type: '扰民',
    author: '受影响居民',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    views: 2103,
    dislikes: 445,
    evidenceImages: ['https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 259200000),
    status: '处理中'
  },
  {
    id: '4',
    title: '发现被遗弃的小狗',
    description: '在垃圾堆旁发现一只被遗弃的小狗，看起来才几个月大。希望有爱心人士能够收养，给它一个温暖的家。',
    location: '深圳市南山区',
    type: '遗弃宠物',
    author: '好心人',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    views: 3456,
    dislikes: 89,
    evidenceImages: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop'],
    createdAt: new Date(Date.now() - 345600000),
    status: '已处理'
  }
];

export const useAppStore = create<AppStore>((set) => ({
  exchangePosts: initialExchangePosts,
  helpRequests: initialHelpRequests,
  events: initialEvents,
  exposures: initialExposures,
  feedPosts: [],
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
  addEvent: (event) =>
    set((state) => ({
      events: [
        {
          ...event,
          id: Date.now().toString(),
          currentParticipants: 0,
          createdAt: new Date()
        },
        ...state.events
      ]
    })),
  addExposure: (exposure) =>
    set((state) => ({
      exposures: [
        {
          ...exposure,
          id: Date.now().toString(),
          views: 0,
          dislikes: 0,
          createdAt: new Date()
        },
        ...state.exposures
      ]
    })),
  addFeedPost: (post) =>
    set((state) => ({
      feedPosts: [
        {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date()
        },
        ...state.feedPosts
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
