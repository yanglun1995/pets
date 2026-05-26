import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  registeredAt: Date;
}

interface Comment {
  id: string;
  postId: string;
  postType: 'exchange' | 'help' | 'event' | 'exposure';
  content: string;
  author: string;
  authorId?: string;
  avatar: string;
  createdAt: Date;
}

interface UserStore {
  users: User[];
  currentUser: User | null;
  comments: Comment[];
  register: (username: string, email: string, password: string) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  getComments: (postId: string) => Comment[];
}

const defaultAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
];

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      comments: [],
      
      register: (username, email, password) => {
        const { users } = get();
        
        if (users.find(u => u.email === email)) {
          return { success: false, message: '该邮箱已被注册' };
        }
        
        if (username.length < 2) {
          return { success: false, message: '用户名至少需要2个字符' };
        }
        
        if (password.length < 6) {
          return { success: false, message: '密码至少需要6个字符' };
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          username,
          email,
          avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
          registeredAt: new Date()
        };
        
        set({ users: [...users, newUser] });
        return { success: true, message: '注册成功！' };
      },
      
      login: (email, password) => {
        const { users } = get();
        const user = users.find(u => u.email === email);
        
        if (!user) {
          return { success: false, message: '用户不存在' };
        }
        
        set({ currentUser: user });
        return { success: true, message: '登录成功！' };
      },
      
      logout: () => {
        set({ currentUser: null });
      },
      
      addComment: (comment) => {
        set((state) => ({
          comments: [
            {
              ...comment,
              id: Date.now().toString(),
              createdAt: new Date()
            },
            ...state.comments
          ]
        }));
      },
      
      getComments: (postId) => {
        return get().comments.filter(c => c.postId === postId);
      }
    }),
    {
      name: 'pet-community-user-storage'
    }
  )
);
