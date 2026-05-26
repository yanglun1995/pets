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
