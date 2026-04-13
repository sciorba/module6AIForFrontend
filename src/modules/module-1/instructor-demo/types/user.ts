export interface UserStats {
  followers: number;
  following: number;
  posts: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  stats: UserStats;
  isFollowedByViewer: boolean;
}

export type ProfileViewMode = "own" | "other";

export interface UserProfileProps {
  user: User;
  viewMode: ProfileViewMode;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onEditProfile?: () => void;
}
