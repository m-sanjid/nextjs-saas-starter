import React from "react";
import { cn } from "@/lib/utils";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "mb-4 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl md:text-4xl",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;