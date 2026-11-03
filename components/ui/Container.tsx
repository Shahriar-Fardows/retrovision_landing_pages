import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// Same content width as the main site: max-w-7xl with 24px gutters.
export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>;
}
