"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Surface = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={clsx("surface-shell rounded-brand", className)}>
      {children}
    </div>
  );
};
