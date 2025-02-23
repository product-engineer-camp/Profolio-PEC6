import { useEffect, useRef, RefObject } from "react";

type UseInfiniteScrollProps = {
  onIntersect: () => Promise<void>;
  threshold?: number;
  rootMargin?: string;
};

export function useInfiniteScroll({
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
}: UseInfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          await onIntersect();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [onIntersect, threshold, rootMargin]);

  return { containerRef };
}
