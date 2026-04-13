import { useState, useEffect } from "react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
} as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, name, size = "md", className = "" }: AvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [src]);

  const showImage = src && !imgFailed;

  return (
    <div
      role="img"
      aria-label={`${name}'s avatar`}
      className={`relative inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold overflow-hidden shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <span aria-hidden="true">{getInitials(name)}</span>
      {showImage && (
        <img
          src={src}
          alt={name}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
