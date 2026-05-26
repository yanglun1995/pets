import { create } from 'zustand';
import { FeedPost, VideoPost, PetProfile, NearbyDog } from '../types';

interface FeedStore {
  feedPosts: FeedPost[];
  videoPosts: VideoPost[];
  petProfiles: PetProfile[];
  nearbyDogs: NearbyDog[];
  currentPetProfile: PetProfile | null;
  addFeedPost: (post: Omit<FeedPost, 'id' | 'createdAt'>) => void;
  addVideoPost: (post: Omit<VideoPost, 'id' | 'createdAt'>) => void;
  likeFeedPost: (postId: string) => void;
}

const initialFeedPosts: FeedPost[] = [
  {
    id: '1',
    type: 'image',
    title: '🐶 柯基小短腿又来卖萌啦！',
    content: '今天妮妮学会新技能啦！握手🤝 大家看看我们可爱吗？#柯基 #萌宠 #可爱',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop',
    author: '柯基妮妮',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    likes: 2345,
    comments: 456,
    createdAt: new Date(Date.now() - 3600000),
    tags: ['#柯基', '#小短腿', '#萌宠'],
    category: '柯基'
  },
  {
    id: '2',
    type: 'image',
    title: '😺 橘猫的日常 - 吃吃睡睡',
    content: '我家橘猫又胖了！每天就是吃和睡，但是好可爱啊~ #橘猫 #肥猫 #日常',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=750&fit=crop',
    author: '橘猫糖糖',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    likes: 1892,
    comments: 234,
    createdAt: new Date(Date.now() - 7200000),
    tags: ['#橘猫', '#肥猫', '#治愈'],
    category: '猫咪'
  },
  {
    id: '3',
    type: 'image',
    title: '🦊 柴犬的微笑 - 治愈满分',
    content: '柴犬的微笑真的太治愈了！每次看到它笑心情都会变好~ #柴犬 #治愈系 #狗狗',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=750&fit=crop',
    author: '柴犬豆豆',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    likes: 3456,
    comments: 567,
    createdAt: new Date(Date.now() - 10800000),
    tags: ['#柴犬', '#微笑', '#治愈'],
    category: '柴犬'
  },
  {
    id: '4',
    type: 'video',
    title: '🐕 金毛日常 - 遛狗时光',
    content: '今天带大黄出去遛弯，好开心！#金毛 #遛狗 #快乐',
    thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=750&fit=crop',
    videoUrl: '',
    author: '金毛大黄',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    likes: 2890,
    comments: 345,
    createdAt: new Date(Date.now() - 14400000),
    tags: ['#金毛', '#遛狗', '#日常'],
    category: '金毛'
  },
  {
    id: '5',
    type: 'image',
    title: '🐶 柯基屁股 - 销魂的小短腿',
    content: '柯基的屁股真的是世界上最可爱的东西！圆滚滚的~ #柯基 #蜜桃臀 #可爱',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=750&fit=crop',
    author: '柯基爱好者',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    likes: 4567,
    comments: 678,
    createdAt: new Date(Date.now() - 18000000),
    tags: ['#柯基', '#屁股', '#可爱'],
    category: '柯基'
  },
  {
    id: '6',
    type: 'image',
    title: '🐱 英短蓝猫 - 高冷小公主',
    content: '我家蓝猫总是一副高冷的样子，但其实超级粘人！#英短 #蓝猫 #高冷',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=750&fit=crop',
    author: '蓝猫公主',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    likes: 1234,
    comments: 189,
    createdAt: new Date(Date.now() - 21600000),
    tags: ['#英短', '#蓝猫', '#高冷'],
    category: '猫咪'
  },
  {
    id: '7',
    type: 'video',
    title: '🦊 柴犬表情包合集',
    content: '收集了柴犬的各种搞笑表情，太魔性了！哈哈哈~ #柴犬 #表情包 #搞笑',
    thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=750&fit=crop',
    videoUrl: '',
    author: '柴犬控',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    likes: 5678,
    comments: 890,
    createdAt: new Date(Date.now() - 25200000),
    tags: ['#柴犬', '#搞笑', '#表情包'],
    category: '柴犬'
  },
  {
    id: '8',
    type: 'image',
    title: '🐕 金毛大暖男 - 陪伴是最长情的告白',
    content: '金毛真的是大暖男！每次我不开心它都会来安慰我~ #金毛 #暖男 #陪伴',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=750&fit=crop',
    author: '金毛主人',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    likes: 2345,
    comments: 345,
    createdAt: new Date(Date.now() - 28800000),
    tags: ['#金毛', '#暖男', '#陪伴'],
    category: '金毛'
  },
  {
    id: '9',
    type: 'image',
    title: '🐱 布偶猫 - 仙女下凡',
    content: '我家布偶猫真的太仙了！眼睛像蓝宝石一样~ #布偶猫 #仙女 #高颜值',
    image: 'https://images.unsplash.com/photo-1568043210943-0e8c6dde0f90?w=600&h=750&fit=crop',
    author: '布偶主人',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    likes: 3456,
    comments: 456,
    createdAt: new Date(Date.now() - 32400000),
    tags: ['#布偶猫', '#仙女', '#高颜值'],
    category: '猫咪'
  },
  {
    id: '10',
    type: 'image',
    title: '🐶 柯基妮妮的自我介绍',
    content: '大家好！我是柯基妮妮，3岁女孩纸~ 爱好吃和睡，会握手和坐下技能！#柯基 #自我介绍 #珠海',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop',
    author: '柯基妮妮',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    likes: 5678,
    comments: 789,
    createdAt: new Date(Date.now() - 36000000),
    tags: ['#柯基', '#妮妮', '#珠海'],
    category: '柯基'
  }
];

const initialVideoPosts: VideoPost[] = [
  {
    id: 'v1',
    title: '🐶 柯基小短腿跑步萌态',
    description: '柯基妮妮跑步的样子太可爱了！小短腿蹬蹬蹬~',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop',
    author: '柯基妮妮',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    likes: 12345,
    comments: 2345,
    views: 67890,
    createdAt: new Date(Date.now() - 86400000),
    tags: ['#柯基', '#跑步', '#可爱']
  },
  {
    id: 'v2',
    title: '🦊 柴犬搞笑合集',
    description: '柴犬的各种搞笑瞬间，笑死我了！',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=750&fit=crop',
    author: '柴犬豆豆',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    likes: 8765,
    comments: 1567,
    views: 45678,
    createdAt: new Date(Date.now() - 172800000),
    tags: ['#柴犬', '#搞笑', '#合集']
  },
  {
    id: 'v3',
    title: '🐱 猫咪治愈瞬间',
    description: '看着猫咪睡觉真的太治愈了~',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=750&fit=crop',
    author: '橘猫糖糖',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    likes: 9876,
    comments: 1789,
    views: 54321,
    createdAt: new Date(Date.now() - 259200000),
    tags: ['#猫咪', '#治愈', '#睡觉']
  },
  {
    id: 'v4',
    title: '🐕 金毛游泳初体验',
    description: '大黄第一次游泳，超级兴奋！',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=750&fit=crop',
    author: '金毛大黄',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    likes: 6543,
    comments: 987,
    views: 34567,
    createdAt: new Date(Date.now() - 345600000),
    tags: ['#金毛', '#游泳', '#夏天']
  }
];

const initialPetProfiles: PetProfile[] = [
  {
    id: 'p1',
    name: '妮妮',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop',
    breed: '柯基犬',
    age: 3,
    gender: 'female',
    description: '我叫妮妮，3岁女孩纸~ 🐾\n\n🏠 家住珠海十字门\n\n💕 爱好：吃和睡\n\n✨ 技能：握手、坐下\n\n快来和我交朋友吧！',
    followers: 12345,
    following: 567,
    posts: 89,
    owner: '妮妮主人',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    createdAt: new Date(Date.now() - 10950000000)
  },
  {
    id: 'p2',
    name: '糖糖',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop',
    breed: '橘猫',
    age: 2,
    gender: 'female',
    description: '我是糖糖，一只爱吃爱睡的小橘猫~',
    followers: 8765,
    following: 345,
    posts: 67,
    owner: '糖糖主人',
    ownerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    createdAt: new Date(Date.now() - 7300000000)
  }
];

const initialNearbyDogs: NearbyDog[] = [
  {
    id: 'n1',
    name: '豆豆',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=150&h=150&fit=crop',
    breed: '柴犬',
    age: 2,
    gender: 'female',
    distance: 0.3,
    location: '十字门华发商都',
    lastSeen: new Date(Date.now() - 1800000),
    owner: '豆豆妈',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 'n2',
    name: '大黄',
    avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop',
    breed: '金毛犬',
    age: 3,
    gender: 'male',
    distance: 0.8,
    location: '拱北口岸',
    lastSeen: new Date(Date.now() - 3600000),
    owner: '大黄爸',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 'n3',
    name: '小橘',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop',
    breed: '橘猫',
    age: 1,
    gender: 'male',
    distance: 1.0,
    location: '吉大海滨公园',
    lastSeen: new Date(Date.now() - 7200000),
    owner: '小橘主人',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: 'n4',
    name: '球球',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150&h=150&fit=crop',
    breed: '英短蓝猫',
    age: 2,
    gender: 'female',
    distance: 1.2,
    location: '前山世邦广场',
    lastSeen: new Date(Date.now() - 10800000),
    owner: '球球主人',
    ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

export const useFeedStore = create<FeedStore>()((set) => ({
  feedPosts: initialFeedPosts,
  videoPosts: initialVideoPosts,
  petProfiles: initialPetProfiles,
  nearbyDogs: initialNearbyDogs,
  currentPetProfile: initialPetProfiles[0],
  
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
