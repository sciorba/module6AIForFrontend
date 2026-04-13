import { useState } from "react";
import type { Comment } from "../../types/feed";
import { UserAvatar } from "./UserAvatar";

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [text, setText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const visibleComments = expanded ? comments : comments.slice(0, 2);
  const hasMore = comments.length > 2 && !expanded;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  }

  return (
    <div className="border-t border-gray-100 dark:border-gray-700 transition-colors">
      {/* Comments list */}
      {comments.length > 0 && (
        <div className="px-4 pt-3 space-y-3">
          {visibleComments.map((c) => (
            <div key={c.id} className="flex gap-2.5">
              <UserAvatar user={c.user} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-700/50 transition-colors">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{c.user.name}</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5">{c.content}</p>
                </div>
                <div className="mt-1 flex items-center gap-3 px-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{timeAgo(c.timestamp)}</span>
                  <button className="text-[10px] font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Like{c.likes > 0 && ` (${c.likes})`}</button>
                  <button className="text-[10px] font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Reply</button>
                </div>
              </div>
            </div>
          ))}
          {hasMore && (
            <button onClick={() => setExpanded(true)} className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400 px-1">
              View {comments.length - 2} more comment{comments.length - 2 > 1 ? "s" : ""}
            </button>
          )}
        </div>
      )}

      {/* Add comment */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          aria-label="Write a comment"
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:bg-gray-600"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Post comment"
          className="rounded-full bg-blue-600 p-1.5 text-white transition-colors hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-blue-500"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  );
}
