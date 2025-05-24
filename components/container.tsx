import React from "react";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";

const Container = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <div id={id} className="min-h-screen">
      <div
        className={cn(
          "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8",
          className,
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Container;
