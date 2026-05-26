import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FeedPost {
  id: string;
  type: 'image' | 'video';
  title: string;
  content: string;
  image?: string;
  videoUrl?: string;
  thumbnail?: string;
  author: string;
  avatar: string;
  likes: number;
  comments: number;
  createdAt: Date;
  tags: string[];
  category: string;
}

interface VideoPost {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  author: string;
  avatar: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  tags: string[];
}

interface PetProfile {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  description: string;
  followers: number;
  following: number;
  posts: number;
  owner: string;
  ownerAvatar: string;
  createdAt: Date;
}

interface NearbyDog {
  id: string;
  name: string;
  avatar: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  distance: number;
  location: string;
  lastSeen: Date;
  owner: string;
  ownerAvatar: string;
}

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

const corgiAvatar = 'https://images.unsplash.com/photo-1558656797-185e1e68f34e?w=200&h=200&fit=crop';
const corgiCover = 'https://images.unsplash.com/photo-1558656797-185e1e68f34e?w=800&h=400&fit=crop';
const corgiPost = 'https://images.unsplash.com/photo-1558656797-185e1e68f34e?w=600&h=750&fit=crop';

const shibaAvatar = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop';
const shibaPost = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=750&fit=crop';

const catAvatar = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop';
const catPost = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=750&fit=crop';

const goldenAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop';
const goldenPost = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=750&fit=crop';

const initialFeedPosts: FeedPost[] = [
  {
    id: '1',
    type: 'image',
    title: '🐶 柯基妮妮的日常 - 卖萌时间！',
    content: '今天妮妮学会新技能啦！握手🤝 大家看看我们可爱吗？#柯基 #萌宠 #可爱',
    image: corgiPost,
    author: '柯基妮妮',
    avatar: corgiAvatar,
    likes: 2345,
    comments: 456,
    createdAt: new Date(Date.now() - 3600000),
    tags: ['#柯基', '#小短腿', '#萌宠'],
    category: '养宠心得'
  },
  {
    id: '2',
    type: 'image',
    title: '🍖 狗狗零食红黑榜！',
    content: '给大家分享一些狗狗零食的测评，哪些值得买，哪些千万别踩坑！#零食 #测评',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=750&fit=crop',
    author: '宠物营养师',
    avatar: goldenAvatar,
    likes: 1892,
    comments: 234,
    createdAt: new Date(Date.now() - 7200000),
    tags: ['#零食', '#测评', '#红黑榜'],
    category: '饮食红黑榜'
  },
  {
    id: '3',
    type: 'image',
    title: '🦊 柴犬豆豆的微笑治愈一切',
    content: '柴犬的微笑真的太治愈了！每次看到它笑心情都会变好~ #柴犬 #治愈系',
    image: shibaPost,
    author: '柴犬豆豆',
    avatar: shibaAvatar,
    likes: 3456,
    comments: 567,
    createdAt: new Date(Date.now() - 10800000),
    tags: ['#柴犬', '#微笑', '#治愈'],
    category: '养宠心得'
  },
  {
    id: '4',
    type: 'image',
    title: '⚠️ 曝光！小区大型犬不牵绳',
    content: '今天在小区看到一只大型犬没牵绳，差点吓到小孩！希望主人能文明养宠！#文明养宠',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=750&fit=crop',
    author: '热心市民',
    avatar: catAvatar,
    likes: 1234,
    comments: 345,
    createdAt: new Date(Date.now() - 14400000),
    tags: ['#曝光', '#文明养宠', '#不牵绳'],
    category: '曝光台'
  },
  {
    id: '5',
    type: 'image',
    title: '🐶 柯基屁股太可爱了！',
    content: '柯基的屁股真的是世界上最可爱的东西！圆滚滚的~ #柯基 #蜜桃臀',
    image: corgiPost,
    author: '柯基妮妮',
    avatar: corgiAvatar,
    likes: 4567,
    comments: 678,
    createdAt: new Date(Date.now() - 18000000),
    tags: ['#柯基', '#屁股', '#可爱'],
    category: '养宠心得'
  },
  {
    id: '6',
    type: 'image',
    title: '🐱 猫咪挑食怎么办？',
    content: '分享一些让猫咪吃饭的小技巧，亲测有效！#猫咪 #挑食 #喂养',
    image: catPost,
    author: '猫奴一枚',
    avatar: catAvatar,
    likes: 1567,
    comments: 234,
    createdAt: new Date(Date.now() - 21600000),
    tags: ['#猫咪', '#挑食', '#喂养'],
    category: '饮食红黑榜'
  },
  {
    id: '7',
    type: 'video',
    title: '🐕 金毛日常 - 游泳初体验',
    content: '今天带大黄去游泳，第一次下水超级兴奋！#金毛 #游泳',
    thumbnail: goldenPost,
    videoUrl: '',
    author: '金毛大黄',
    avatar: goldenAvatar,
    likes: 2890,
    comments: 345,
    createdAt: new Date(Date.now() - 25200000),
    tags: ['#金毛', '#游泳', '#夏天'],
    category: '养宠心得'
  },
  {
    id: '8',
    type: 'image',
    title: '⚠️ 曝光！宠物粪便不清理',
    content: '小区草坪上经常有人不清理宠物粪便，太不文明了！请大家文明养宠！#文明养宠',
    image: 'https://images.unsplash.com/photo-1568043210943-0e8c6dde0f90?w=600&h=750&fit=crop',
    author: '爱护环境',
    avatar: goldenAvatar,
    likes: 2345,
    comments: 456,
    createdAt: new Date(Date.now() - 28800000),
    tags: ['#曝光', '#文明养宠', '#环境卫生'],
    category: '曝光台'
  },
  {
    id: '9',
    type: 'image',
    title: '🍎 狗狗不能吃的水果清单',
    content: '很多水果对狗狗有毒！分享一份清单，大家一定要注意！#水果 #禁忌',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=750&fit=crop',
    author: '宠物营养师',
    avatar: goldenAvatar,
    likes: 3456,
    comments: 456,
    createdAt: new Date(Date.now() - 32400000),
    tags: ['#水果', '#禁忌', '#安全'],
    category: '饮食红黑榜'
  },
  {
    id: '10',
    type: 'image',
    title: '🐶 柯基妮妮的自我介绍',
    content: '大家好！我是柯基妮妮，3岁女孩纸~ 爱好吃和睡，会握手和坐下技能！#柯基 #自我介绍',
    image: corgiPost,
    author: '柯基妮妮',
    avatar: corgiAvatar,
    likes: 5678,
    comments: 789,
    createdAt: new Date(Date.now() - 36000000),
    tags: ['#柯基', '#妮妮', '#珠海'],
    category: '养宠心得'
  }
];

const initialVideoPosts: VideoPost[] = [
  {
    id: 'v1',
    title: '🐶 柯基小短腿跑步萌态',
    description: '柯基妮妮跑步的样子太可爱了！小短腿蹬蹬蹬~',
    videoUrl: '',
    thumbnail: corgiPost,
    author: '柯基妮妮',
    avatar: corgiAvatar,
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
    thumbnail: shibaPost,
    author: '柴犬豆豆',
    avatar: shibaAvatar,
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
    thumbnail: catPost,
    author: '猫奴一枚',
    avatar: catAvatar,
    likes: 9876,
    comments: 1789,
    views: 54321,
    createdAt: new Date(Date.now() - 259200000),
    tags: ['#猫咪', '#治愈', '#睡觉']
  }
];

const initialPetProfiles: PetProfile[] = [
  {
    id: 'p1',
    name: '妮妮',
    avatar: corgiAvatar,
    coverImage: corgiCover,
    breed: '柯基犬',
    age: 3,
    gender: 'female',
    description: '我叫妮妮，3岁女孩纸~ 🐾\n\n🏠 家住珠海十字门\n\n💕 爱好：吃和睡\n\n✨ 技能：握手、坐下\n\n快来和我交朋友吧！',
    followers: 12345,
    following: 567,
    posts: 89,
    owner: '妮妮主人',
    ownerAvatar: corgiAvatar,
    createdAt: new Date(Date.now() - 10950000000)
  },
  {
    id: 'p2',
    name: '豆豆',
    avatar: shibaAvatar,
    coverImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=400&fit=crop',
    breed: '柴犬',
    age: 2,
    gender: 'female',
    description: '我是豆豆，一只爱笑的柴犬~',
    followers: 8765,
    following: 345,
    posts: 67,
    owner: '豆豆主人',
    ownerAvatar: shibaAvatar,
    createdAt: new Date(Date.now() - 7300000000)
  }
];

const initialNearbyDogs: NearbyDog[] = [
  {
    id: 'n1',
    name: '豆豆',
    avatar: shibaPost,
    breed: '柴犬',
    age: 2,
    gender: 'female',
    distance: 0.3,
    location: '十字门华发商都',
    lastSeen: new Date(Date.now() - 1800000),
    owner: '豆豆妈',
    ownerAvatar: shibaAvatar
  },
  {
    id: 'n2',
    name: '大黄',
    avatar: goldenPost,
    breed: '金毛犬',
    age: 3,
    gender: 'male',
    distance: 0.8,
    location: '拱北口岸',
    lastSeen: new Date(Date.now() - 3600000),
    owner: '大黄爸',
    ownerAvatar: goldenAvatar
  },
  {
    id: 'n3',
    name: '小橘',
    avatar: catPost,
    breed: '橘猫',
    age: 1,
    gender: 'male',
    distance: 1.0,
    location: '吉大海滨公园',
    lastSeen: new Date(Date.now() - 7200000),
    owner: '小橘主人',
    ownerAvatar: catAvatar
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
    ownerAvatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop'
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
