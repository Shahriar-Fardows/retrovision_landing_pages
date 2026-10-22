type ArrowIconProps = {
  direction?: "up-right" | "right";
  className?: string;
};

export default function ArrowIcon({ direction = "up-right", className = "size-4" }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {direction === "up-right" ? (
        <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
      ) : (
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      )}
    </svg>
  );
}
