import { useState } from "react";
import type { ProfileViewMode } from "../../types/user";
import { Button } from "../ui/Button";

interface UserProfileActionsProps {
  viewMode: ProfileViewMode;
  isFollowing: boolean;
  isFollowLoading: boolean;
  onToggleFollow: () => void;
  onMessage?: (userId: string) => void;
  onEditProfile?: () => void;
  userId: string;
  username: string;
}

export function UserProfileActions({
  viewMode,
  isFollowing,
  isFollowLoading,
  onToggleFollow,
  onMessage,
  onEditProfile,
  userId,
  username,
}: UserProfileActionsProps) {
  const [isHovering, setIsHovering] = useState(false);

  if (viewMode === "own") {
    return (
      <div role="group" aria-label="Profile actions">
        <Button
          variant="secondary"
          className="w-full"
          onClick={onEditProfile}
        >
          Edit Profile
        </Button>
      </div>
    );
  }

  const followLabel = isFollowing
    ? isHovering
      ? "Unfollow"
      : "Following"
    : "Follow";

  const followAriaLabel = isFollowing
    ? `Unfollow @${username}`
    : `Follow @${username}`;

  return (
    <div
      role="group"
      aria-label="Profile actions"
      className="flex flex-col gap-3 sm:flex-row"
    >
      <Button
        variant={isFollowing ? "outline" : "primary"}
        className={`flex-1 ${isFollowing && isHovering ? "border-red-300 text-red-600 hover:bg-red-50" : ""}`}
        onClick={onToggleFollow}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={isFollowLoading}
        aria-pressed={isFollowing}
        aria-label={followAriaLabel}
      >
        {followLabel}
      </Button>
      <Button
        variant="secondary"
        className="flex-1"
        onClick={() => onMessage?.(userId)}
        aria-label={`Message @${username}`}
      >
        Message
      </Button>
    </div>
  );
}
