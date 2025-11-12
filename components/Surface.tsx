"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Surface = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={clsx("rounded-brand bg-white/5 border border-white/10 backdrop-blur shadow-lg", className)}>
      {children}
    </div>
  );
};
