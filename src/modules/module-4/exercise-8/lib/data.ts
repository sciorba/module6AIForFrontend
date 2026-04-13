import type { Post, FeedUser } from "../types/feed";

export const currentUser: FeedUser = {
  id: "u0",
  name: "Jane Cooper",
  handle: "@janecooper",
  avatarUrl: "https://i.pravatar.cc/150?u=janecooper",
};

const users: FeedUser[] = [
  { id: "u1", name: "Sarah Chen", handle: "@sarahchen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" },
  { id: "u2", name: "Marcus Rivera", handle: "@marcusdev", avatarUrl: "https://i.pravatar.cc/150?u=marcus2" },
  { id: "u3", name: "Alex Kim", handle: "@alexdesigns", avatarUrl: "https://i.pravatar.cc/150?u=alexk" },
  { id: "u4", name: "Jordan Park", handle: "@jordanpark", avatarUrl: "https://i.pravatar.cc/150?u=jordan2" },
];

export const initialPosts: Post[] = [
  {
    id: "p1",
    user: users[0],
    content: "Just shipped the new landing page redesign! Really proud of how the hero section turned out. The team crushed it this sprint. 🚀\n\nCheck out the before/after comparison — what do you think?",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    timestamp: "2026-04-13T14:30:00Z",
    likes: 42,
    isLiked: false,
    shares: 8,
    comments: [
      { id: "c1", user: users[2], content: "This looks amazing! Love the color palette choices.", timestamp: "2026-04-13T14:45:00Z", likes: 5 },
      { id: "c2", user: users[1], content: "Great work Sarah! The animation on scroll is super smooth.", timestamp: "2026-04-13T15:00:00Z", likes: 3 },
    ],
  },
  {
    id: "p2",
    user: users[1],
    content: "Hot take: TypeScript strict mode should be the default on every project. Yes, it's more work upfront. No, you won't regret it 6 months later when you're refactoring.\n\nThe type safety has saved us from at least 3 production bugs this quarter alone.",
    timestamp: "2026-04-13T12:00:00Z",
    likes: 89,
    isLiked: true,
    shares: 24,
    comments: [
      { id: "c3", user: users[3], content: "100% agree. The initial setup cost pays for itself within the first week.", timestamp: "2026-04-13T12:30:00Z", likes: 12 },
    ],
  },
  {
    id: "p3",
    user: users[2],
    content: "New design system components are live! Built with Tailwind CSS v4 and React 19. Includes buttons, inputs, cards, modals, and a fully accessible color system with dark mode support.",
    imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop",
    timestamp: "2026-04-13T09:15:00Z",
    likes: 67,
    isLiked: false,
    shares: 15,
    comments: [],
  },
  {
    id: "p4",
    user: users[3],
    content: "TIL: You can use `useMemo` with a dependency array of `[JSON.stringify(obj)]` to memoize based on deep equality. Not ideal for performance-critical paths, but handy for config objects that change shape rarely.",
    timestamp: "2026-04-12T18:00:00Z",
    likes: 31,
    isLiked: false,
    shares: 6,
    comments: [
      { id: "c4", user: users[0], content: "Careful with this pattern though — JSON.stringify doesn't handle circular references or undefined values.", timestamp: "2026-04-12T18:30:00Z", likes: 8 },
      { id: "c5", user: users[1], content: "I usually reach for a deep comparison hook instead. Less footgun potential.", timestamp: "2026-04-12T19:00:00Z", likes: 4 },
      { id: "c6", user: users[3], content: "Good points! Updated my notes. For simple cases it still works well though.", timestamp: "2026-04-12T19:15:00Z", likes: 2 },
    ],
  },
  {
    id: "p5",
    user: users[0],
    content: "Attending ReactConf next month! Anyone else going? Would love to meet up. DM me if you want to grab coffee. ☕",
    timestamp: "2026-04-12T10:00:00Z",
    likes: 23,
    isLiked: true,
    shares: 3,
    comments: [],
  },
];
