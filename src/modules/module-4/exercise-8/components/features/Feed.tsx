import { useFeed } from "../../hooks/useFeed";
import { CreatePost } from "../ui/CreatePost";
import { PostCard } from "../ui/PostCard";

export function Feed() {
  const { posts, toggleLike, addComment, createPost, sharePost } = useFeed();

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Feed</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">
          See what your team is up to.
        </p>
      </div>

      {/* Create post */}
      <CreatePost onPost={createPost} />

      {/* Post list */}
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onToggleLike={toggleLike}
            onAddComment={addComment}
            onShare={sharePost}
          />
        ))}
      </div>

      {/* Infinite scroll placeholder */}
      <div className="mt-8 flex flex-col items-center gap-2 py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 dark:border-gray-600 dark:border-t-blue-400" />
        <p className="text-xs text-gray-400 dark:text-gray-500">Loading more posts...</p>
      </div>
    </div>
  );
}
