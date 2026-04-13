import type { Post } from "../../types/feed";
import { UserAvatar } from "./UserAvatar";
import { CommentSection } from "./CommentSection";

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
}

export function PostCard({ post, onToggleLike, onAddComment, onShare }: PostCardProps) {
  return (
    <article aria-label={`Post by ${post.user.name}`} className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <UserAvatar user={post.user} size="md" showName subtitle={timeAgo(post.timestamp)} />
        <button aria-label="More options" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pt-3">
        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="mt-3 overflow-hidden">
          <img src={post.imageUrl} alt="Post attachment" className="w-full object-cover max-h-80" />
        </div>
      )}

      {/* Engagement stats */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{post.likes > 0 && `${post.likes} like${post.likes !== 1 ? "s" : ""}`}</span>
        <div className="flex gap-3">
          {post.comments.length > 0 && <span>{post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}</span>}
          {post.shares > 0 && <span>{post.shares} share{post.shares !== 1 ? "s" : ""}</span>}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex border-t border-gray-100 dark:border-gray-700 transition-colors">
        <button
          onClick={() => onToggleLike(post.id)}
          aria-label={post.isLiked ? "Unlike" : "Like"}
          aria-pressed={post.isLiked}
          className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            post.isLiked
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
              : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50"
          }`}
        >
          <svg className="h-5 w-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={post.isLiked ? 0 : 1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          Like
        </button>
        <button
          className="flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>
          Comment
        </button>
        <button
          onClick={() => onShare(post.id)}
          className="flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
          Share
        </button>
      </div>

      {/* Comments */}
      <CommentSection
        comments={post.comments}
        onAddComment={(content) => onAddComment(post.id, content)}
      />
    </article>
  );
}
