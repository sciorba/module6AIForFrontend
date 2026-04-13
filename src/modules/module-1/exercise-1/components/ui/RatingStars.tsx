interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

function StarIcon({ fill }: { fill: "full" | "half" | "empty" }) {
  const id = `half-${Math.random().toString(36).slice(2, 9)}`;

  if (fill === "half") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 20 20" aria-hidden="true">
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${id})`}
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
        />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fill={fill === "full" ? "#facc15" : "#e5e7eb"}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
      />
    </svg>
  );
}

export function RatingStars({ rating, reviewCount, className = "" }: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= rating) return "full" as const;
    if (i + 0.5 <= rating) return "half" as const;
    return "empty" as const;
  });

  return (
    <div
      role="img"
      aria-label={`Rating: ${rating} out of 5 stars${reviewCount !== undefined ? `, ${reviewCount} reviews` : ""}`}
      className={`inline-flex items-center gap-0.5 ${className}`}
    >
      {stars.map((fill, i) => (
        <StarIcon key={i} fill={fill} />
      ))}
      {reviewCount !== undefined && (
        <span className="ml-1.5 text-sm text-gray-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
