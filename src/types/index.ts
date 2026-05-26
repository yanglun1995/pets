export interface ExchangePost {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: string;
  likes: number;
  comments: number;
  createdAt: Date;
  image?: string;
}

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  author: string;
  avatar: string;
  contact: string;
  urgency: number;
  status: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  image: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: string;
  status: string;
  createdAt: Date;
}

export interface Exposure {
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

export interface VideoPost {
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

export interface PetProfile {
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

export interface NearbyDog {
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

export interface FeedPost {
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