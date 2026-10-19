"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { SearchProductsToolInvocation } from "@/lib/agent";
import { TriangleImage } from "./triangle-image";

interface AgentProductListProps {
  invocation: SearchProductsToolInvocation;
}

export function AgentProductList({ invocation }: AgentProductListProps) {
  if (
    invocation.state === "input-streaming" ||
    invocation.state === "input-available"
  ) {
    const query = invocation.input?.query;
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        Searching{query ? ` for "${query}"` : ""}…
      </div>
    );
  }

  if (invocation.state !== "output-available") return null;

  const output = invocation.output;

  if (!output) return null;

  if ("error" in output && output.error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {output.error}
      </div>
    );
  }

  if (output.count === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <ul className="divide-y divide-border">
        {output.products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center gap-3 p-3 transition-colors hover:bg-secondary/50"
            >
              {product.image ? (
                <TriangleImage
                  src={product.image}
                  alt={product.name}
                  seed={product.id}
                  sizes="56px"
                  className="h-14 w-14 shrink-0 rounded-md"
                />
              ) : (
                <div className="h-14 w-14 shrink-0 rounded-md bg-black" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(product.price, product.currency)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}