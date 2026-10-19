import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type TriangleOrientation = "up" | "right" | "down";

interface TriangleImageProps
  extends Omit<ImageProps, "fill" | "width" | "height"> {
  seed?: string;
  orientation?: TriangleOrientation;
  className?: string;
}

function orientationFromSeed(seed: string): TriangleOrientation {
  const hash = [...seed].reduce((value, character) => value + character.charCodeAt(0), 0);
  return (["up", "right", "down"] as const)[hash % 3];
}

export function TriangleImage({
  seed = "triangle-image",
  orientation,
  className,
  alt,
  ...props
}: TriangleImageProps) {
  return (
    <div
      className={cn("triangle-image relative aspect-square overflow-hidden", className)}
      data-orientation={orientation ?? orientationFromSeed(seed)}
    >
      <div className="triangle-image__mask">
        <Image
          {...props}
          alt={alt}
          fill
          className="triangle-image__image object-cover"
        />
      </div>
    </div>
  );
}
