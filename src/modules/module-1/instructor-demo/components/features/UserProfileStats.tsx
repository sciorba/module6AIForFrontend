import type { UserStats } from "../../types/user";
import { StatItem } from "../ui/StatItem";

interface UserProfileStatsProps {
  stats: UserStats;
}

export function UserProfileStats({ stats }: UserProfileStatsProps) {
  return (
    <section aria-label="Profile statistics">
      <div className="flex justify-around divide-x divide-gray-200">
        <StatItem label="Posts" value={stats.posts} />
        <StatItem label="Followers" value={stats.followers} />
        <StatItem label="Following" value={stats.following} />
      </div>
    </section>
  );
}
