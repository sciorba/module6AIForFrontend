import { useState, useCallback } from "react";

interface UseFollowToggleOptions {
  userId: string;
  initialFollowing: boolean;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
}

export function useFollowToggle({
  userId,
  initialFollowing,
  onFollow,
  onUnfollow,
}: UseFollowToggleOptions) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFollow = useCallback(() => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        onUnfollow?.(userId);
      } else {
        onFollow?.(userId);
      }
      setIsFollowing((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  }, [isFollowing, userId, onFollow, onUnfollow]);

  return { isFollowing, isLoading, toggleFollow };
}
