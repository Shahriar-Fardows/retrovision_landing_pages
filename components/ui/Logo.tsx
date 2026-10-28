import Image from "next/image";

// The supplied Retro_Vision logo (3D glasses + wordmark), 857×95 source.
// Width drives size; the aspect ratio is never distorted.
export default function Logo({ className = "w-[200px]", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/retro-vision-logo.png"
      alt="Retro_Vision"
      width={857}
      height={95}
      priority={priority}
      sizes="240px"
      className={`h-auto ${className}`}
    />
  );
}
