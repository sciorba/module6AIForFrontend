import { useState, useCallback } from "react";
import type { Post, Comment } from "../types/feed";
import { initialPosts, currentUser } from "../lib/data";

export function useFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p,
      ),
    );
  }, []);

  const addComment = useCallback((postId: string, content: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      user: currentUser,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p,
      ),
    );
  }, []);

  const createPost = useCallback((content: string, imageUrl?: string) => {
    const newPost: Post = {
      id: `p-${Date.now()}`,
      user: currentUser,
      content,
      imageUrl,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: [],
      shares: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const sharePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, shares: p.shares + 1 } : p)),
    );
  }, []);

  return { posts, toggleLike, addComment, createPost, sharePost };
}
