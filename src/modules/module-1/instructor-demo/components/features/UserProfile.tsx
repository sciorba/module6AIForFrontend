import type { UserProfileProps } from "../../types/user";
import { useFollowToggle } from "../../hooks/useFollowToggle";
import { Avatar } from "../ui/Avatar";
import { UserProfileStats } from "./UserProfileStats";
import { UserProfileActions } from "./UserProfileActions";

export function UserProfile({
  user,
  viewMode,
  onFollow,
  onUnfollow,
  onMessage,
  onEditProfile,
}: UserProfileProps) {
  const { isFollowing, isLoading, toggleFollow } = useFollowToggle({
    userId: user.id,
    initialFollowing: user.isFollowedByViewer,
    onFollow,
    onUnfollow,
  });

  return (
    <article
      aria-label={`User profile for ${user.name}`}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="p-6 sm:p-8">
        {/* Header: Avatar + Name */}
        <header className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar
            src={user.avatarUrl}
            name={user.name}
            size="lg"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </header>

        {/* Bio */}
        {user.bio && (
          <p className="mt-4 text-gray-700 text-center sm:text-left">
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <UserProfileStats stats={user.stats} />
        </div>

        {/* Actions */}
        <div className="mt-6">
          <UserProfileActions
            viewMode={viewMode}
            isFollowing={isFollowing}
            isFollowLoading={isLoading}
            onToggleFollow={toggleFollow}
            onMessage={onMessage}
            onEditProfile={onEditProfile}
            userId={user.id}
            username={user.username}
          />
        </div>
      </div>
    </article>
  );
}
