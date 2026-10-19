"use client";

import { BookOpen, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TaskStatus = "running" | "complete" | "error";

interface TaskProps {
  title: string;
  status: TaskStatus;
  children?: ReactNode;
  className?: string;
}

export function Task({ title, status, children, className }: TaskProps) {
  return (
    <details
      className={cn(
        "task-interface w-fit max-w-full rounded-full border border-border bg-muted/40 text-sm",
        className,
      )}
    >
      <summary className="task-interface__summary flex cursor-pointer list-none items-center gap-2 px-3 py-1.5 text-muted-foreground marker:hidden">
        <ChevronRight className="task-interface__chevron size-3.5 shrink-0" />
        <BookOpen className="size-3.5 shrink-0" />
        <span className="truncate">{title}</span>
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            status === "running" && "animate-pulse bg-primary",
            status === "complete" && "bg-emerald-500",
            status === "error" && "bg-destructive",
          )}
        />
      </summary>
      {children && (
        <div className="task-interface__content mt-1 w-full min-w-64 rounded-lg border border-border bg-card p-2">
          {children}
        </div>
      )}
    </details>
  );
}
