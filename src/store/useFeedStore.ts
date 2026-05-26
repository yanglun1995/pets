import { create } from 'zustand';
import { FeedPost, VideoPost, PetProfile, NearbyDog } from '../types';

interface FeedStore {
  feedPosts: FeedPost[];
  videoPosts: VideoPost[];
  petProfiles: PetProfile[];
  nearbyDogs: NearbyDog[];
  addFeedPost: (post: Omit<FeedPost, 'id' | 'createdAt'>) => void;
  addVideoPost: (post: Omit<VideoPost, 'id' | 'createdAt'>) => void;
  likeFeedPost: (postId: string) => void;
}

const initialFeedPosts: FeedPost[] = [
  {
    id: '1',
    type: 'image',
    title: '我家小柯基的日常',
    content: '今天带它去公园玩，开心得不得了！#柯基 #宠物日常',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
    author: '小柯基妈妈',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    likes: 234,
    comments: 45,
    createdAt: new Date(Date.now() - 3600000),
    tags: ['#柯基', '#宠物日常'],
    category: '萌宠'
  },
  {
    id: '2',
    type: 'video',
    title: '猫咪撒娇的样子太可爱了',
    content: '每次看到它这样就心都化了 #猫咪 #萌宠',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=800&fit=crop',
    videoUrl: '',
    author: '猫奴一枚',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    likes: 567,
    comments: 89,
    createdAt: new Date(Date.now() - 7200000),
    tags: ['#猫咪', '#萌宠'],
    category: '萌宠'
  },
  {
    id: '3',
    type: 'image',
    title: '狗狗训练小技巧分享',
    content: '分享一下我训练金毛的心得，大家一起交流！#训练 #金毛',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=800&fit=crop',
    author: '金毛爱好者',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    likes: 189,
    comments: 34,
    createdAt: new Date(Date.now() - 10800000),
    tags: ['#训练', '#金毛'],
    category: '训练'
  },
  {
    id: '4',
    type: 'image',
    title: '自制宠物零食',
    content: '自己动手做的狗狗零食，健康又美味！#DIY #宠物零食',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop',
    author: '烘焙达人',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    likes: 423,
    comments: 56,
    createdAt: new Date(Date.now() - 14400000),
    tags: ['#DIY', '#宠物零食'],
    category: '饮食'
  },
  {
    id: '5',
    type: 'video',
    title: '宠物游泳初体验',
    content: '第一次带它游泳，超级兴奋！#游泳 #夏天',
    thumbnail: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&h=800&fit=crop',
    videoUrl: '',
    author: '夏日炎炎',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    likes: 789,
    comments: 123,
    createdAt: new Date(Date.now() - 18000000),
    tags: ['#游泳', '#夏天'],
    category: '运动'
  },
  {
    id: '6',
    type: 'image',
    title: '宠物用品开箱',
    content: '新买的宠物用品到了，开箱分享！#开箱 #宠物用品',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=800&fit=crop',
    author: '购物达人',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    likes: 345,
    comments: 78,
    createdAt: new Date(Date.now() - 21600000),
    tags: ['#开箱', '#宠物用品'],
    category: '好物'
  }
];

const initialVideoPosts: VideoPost[] = [
  {
    id: 'v1',
    title: '狗狗搞笑瞬间合集',
    description: '收集了我家狗狗的各种搞笑时刻，太有趣了！',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=800&fit=crop',
    author: '快乐铲屎官',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    likes: 1234,
    comments: 234,
    views: 5678,
    createdAt: new Date(Date.now() - 86400000),
    tags: ['#搞笑', '#合集']
  },
  {
    id: 'v2',
    title: '猫咪治愈系视频',
    description: '看着猫咪睡觉真的很治愈',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=800&fit=crop',
    author: '治愈系萌宠',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    likes: 876,
    comments: 156,
    views: 4321,
    createdAt: new Date(Date.now() - 172800000),
    tags: ['#治愈', '#猫咪']
  },
  {
    id: 'v3',
    title: '宠物美容全过程',
    description: '记录狗狗美容的全过程，变帅啦！',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
    author: '宠物造型师',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    likes: 654,
    comments: 98,
    views: 2345,
    createdAt: new Date(Date.now() - 259200000),
    tags: ['#美容', '#造型']
  }
];

const initialPetProfiles: PetProfile[] = [
  {
    id: 'p1',
    name: '小短腿',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop',
    breed: '柯基犬',
    age: 2,
    gender: 'male',
    description: '一只超级可爱的小柯基，喜欢撒娇和吃零食！',
    followers: 1234,
    following: 567,
    posts: 89,
    owner: '小柯基妈妈',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    createdAt: new Date(Date.now() - 7300000000)
  },
  {
    id: 'p2',
    name: '橘子',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=400&fit=crop',
    breed: '橘猫',
    age: 3,
    gender: 'female',
    description: '一只超会撒娇的橘猫，每天都要抱抱！',
    followers: 876,
    following: 345,
    posts: 67,
    owner: '猫奴一枚',
    ownerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    createdAt: new Date(Date.now() - 10950000000)
  }
];

const initialNearbyDogs: NearbyDog[] = [
  {
    id: 'n1',
    name: '豆豆',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    breed: '柯基犬',
    age: 1,
    gender: 'female',
    distance: 0.5,
    location: '中央公园',
    lastSeen: new Date(Date.now() - 1800000),
    owner: '豆豆妈妈',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  },
  {
    id: 'n2',
    name: '旺财',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    breed: '金毛犬',
    age: 3,
    gender: 'male',
    distance: 0.8,
    location: '世纪广场',
    lastSeen: new Date(Date.now() - 3600000),
    owner: '金毛爱好者',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 'n3',
    name: '球球',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    breed: '泰迪犬',
    age: 2,
    gender: 'female',
    distance: 1.2,
    location: '市民公园',
    lastSeen: new Date(Date.now() - 7200000),
    owner: '泰迪控',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 'n4',
    name: '大黑',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    breed: '拉布拉多',
    age: 4,
    gender: 'male',
    distance: 1.5,
    location: '滨江大道',
    lastSeen: new Date(Date.now() - 10800000),
    owner: '爱狗人士',
    ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

export const useFeedStore = create<FeedStore>()((set) => ({
  feedPosts: initialFeedPosts,
  videoPosts: initialVideoPosts,
  petProfiles: initialPetProfiles,
  nearbyDogs: initialNearbyDogs,
  
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
  
  addVideoPost: (post) =>
    set((state) => ({
      videoPosts: [
        {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date()
        },
        ...state.videoPosts
      ]
    })),
  
  likeFeedPost: (postId) =>
    set((state) => ({
      feedPosts: state.feedPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    }))
}));
