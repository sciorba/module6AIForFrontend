export interface FeedUser {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  user: FeedUser;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  user: FeedUser;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  shares: number;
}
