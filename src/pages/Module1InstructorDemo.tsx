import { Link } from "react-router-dom";
import { UserProfile } from "../modules/module-1/instructor-demo/components/features";
import type { User } from "../modules/module-1/instructor-demo/types/user";

const users: { user: User; viewMode: "own" | "other"; label: string }[] = [
  {
    label: "Your Profile",
    viewMode: "own",
    user: {
      id: "1",
      name: "Alex Morgan",
      username: "alexmorgan",
      bio: "Full-stack developer and open source enthusiast. Building tools that make developers' lives easier.",
      avatarUrl: "https://i.pravatar.cc/150?u=alexmorgan",
      stats: { followers: 3200, following: 450, posts: 128 },
      isFollowedByViewer: false,
    },
  },
  {
    label: "Not Following",
    viewMode: "other",
    user: {
      id: "2",
      name: "Jane Cooper",
      username: "janecooper",
      bio: "Design engineer. Building interfaces that feel like magic. Lover of clean code and great typography.",
      avatarUrl: "https://i.pravatar.cc/150?u=janecooper",
      stats: { followers: 10543, following: 892, posts: 247 },
      isFollowedByViewer: false,
    },
  },
  {
    label: "Already Following",
    viewMode: "other",
    user: {
      id: "3",
      name: "Marcus Chen",
      username: "marcuschen",
      bio: "Staff engineer @BigCorp. Distributed systems, Rust, and too many side projects. He/him.",
      avatarUrl: "https://i.pravatar.cc/150?u=marcuschen",
      stats: { followers: 48200, following: 312, posts: 1843 },
      isFollowedByViewer: true,
    },
  },
  {
    label: "No Avatar (Initials Fallback)",
    viewMode: "other",
    user: {
      id: "4",
      name: "Priya Sharma",
      username: "priyasharma",
      bio: "Data scientist turning messy datasets into clear stories. Currently exploring LLMs.",
      stats: { followers: 870, following: 2100, posts: 56 },
      isFollowedByViewer: false,
    },
  },
  {
    label: "High Follower Count",
    viewMode: "other",
    user: {
      id: "5",
      name: "Lena Rossi",
      username: "lenarossi",
      bio: "CEO & co-founder @StartupXYZ. Forbes 30 Under 30. Angel investor. I write about startups, leadership, and building products people love.",
      avatarUrl: "https://i.pravatar.cc/150?u=lenarossi",
      stats: { followers: 1250000, following: 420, posts: 3100 },
      isFollowedByViewer: true,
    },
  },
  {
    label: "New User (Low Stats)",
    viewMode: "other",
    user: {
      id: "6",
      name: "Tom",
      username: "tom_dev",
      bio: "Just getting started!",
      avatarUrl: "https://i.pravatar.cc/150?u=tom_dev",
      stats: { followers: 3, following: 28, posts: 1 },
      isFollowedByViewer: false,
    },
  },
];

export default function Module1InstructorDemo() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
        >
          &larr; Back to modules
        </Link>

        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Module 1 &mdash; Instructor Demo
          </h1>
          <p className="mt-2 text-gray-500">
            UserProfile component showcasing different states and configurations
          </p>
        </header>

        <div className="space-y-10">
          {users.map(({ user, viewMode, label }) => (
            <section key={user.id}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
              </h2>
              <UserProfile
                user={user}
                viewMode={viewMode}
                onFollow={(id) => console.log("Follow", id)}
                onUnfollow={(id) => console.log("Unfollow", id)}
                onMessage={(id) => console.log("Message", id)}
                onEditProfile={() => console.log("Edit profile")}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
