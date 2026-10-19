"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReasoningProps {
  children: ReactNode;
  isStreaming?: boolean;
  className?: string;
}

export function Reasoning({
  children,
  isStreaming = false,
  className,
}: ReasoningProps) {
  const [open, setOpen] = useState(isStreaming);

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className={cn(
        "w-full rounded-lg border border-border bg-muted/40 text-sm",
        className,
      )}
    >
      {children}
    </details>
  );
}

export function ReasoningTrigger({
  isStreaming = false,
}: {
  isStreaming?: boolean;
}) {
  return (
    <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 font-medium text-muted-foreground marker:hidden">
      <span
        className={cn(
          "size-2 rounded-full bg-muted-foreground/50",
          isStreaming && "animate-pulse bg-primary",
        )}
      />
      {isStreaming ? "Thinking…" : "Reasoning"}
      <span className="ml-auto text-xs">⌄</span>
    </summary>
  );
}

export function ReasoningContent({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-border px-3 py-2 text-muted-foreground">
      {children}
    </div>
  );
}
