"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

type Listener = () => void;

export type CarouselApi = {
  selectedScrollSnap: () => number;
  scrollSnapList: () => number[];
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  on: (event: "select" | "reInit", listener: Listener) => void;
  off: (event: "select" | "reInit", listener: Listener) => void;
};

type CarouselContextValue = {
  api: CarouselApi | null;
};

const CarouselContext = createContext<CarouselContextValue>({ api: null });

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Carousel({
  children,
  className,
  setApi,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  opts?: Record<string, unknown>;
  setApi?: (api: CarouselApi) => void;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const listenersRef = useRef<Record<"select" | "reInit", Set<Listener>>>({
    select: new Set(),
    reInit: new Set(),
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const notify = (event: "select" | "reInit") => {
    listenersRef.current[event].forEach((listener) => listener());
  };

  const api = useMemo<CarouselApi>(
    () => ({
      selectedScrollSnap: () => selectedIndex,
      scrollSnapList: () => Array.from({ length: snapCount }, (_, index) => index),
      scrollTo: (index) => {
        const viewport = viewportRef.current;
        const child = viewport?.children[index] as HTMLElement | undefined;
        child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        setSelectedIndex(Math.max(0, Math.min(index, Math.max(0, snapCount - 1))));
      },
      scrollPrev: () => api.scrollTo(selectedIndex <= 0 ? Math.max(0, snapCount - 1) : selectedIndex - 1),
      scrollNext: () => api.scrollTo(selectedIndex >= snapCount - 1 ? 0 : selectedIndex + 1),
      on: (event, listener) => listenersRef.current[event].add(listener),
      off: (event, listener) => listenersRef.current[event].delete(listener),
    }),
    [selectedIndex, snapCount],
  );

  useEffect(() => {
    setApi?.(api);
  }, [api, setApi]);

  useEffect(() => {
    notify("select");
  }, [selectedIndex]);

  useEffect(() => {
    notify("reInit");
  }, [snapCount]);

  return (
    <CarouselContext.Provider value={{ api }}>
      <div className={cn("relative", className)} {...props}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          if (child.type === CarouselContent) {
            return cloneElement(child as ReactElement<{ viewportRef?: Ref<HTMLDivElement>; setSnapCount?: typeof setSnapCount }>, {
              viewportRef,
              setSnapCount,
            });
          }
          return child;
        })}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  children,
  viewportRef,
  setSnapCount,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  viewportRef?: Ref<HTMLDivElement>;
  setSnapCount?: (count: number) => void;
}) {
  useEffect(() => {
    setSnapCount?.(Children.count(children));
  }, [children, setSnapCount]);

  return (
    <div
      ref={viewportRef}
      className={cn("flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CarouselItem({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 shrink-0 snap-start", className)} {...props} />;
}

export function CarouselPrevious({ className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { api } = useContext(CarouselContext);
  return (
    <button type="button" aria-label="Previous slide" className={cn("absolute grid place-items-center rounded-full border", className)} onClick={() => api?.scrollPrev()} {...props}>
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

export function CarouselNext({ className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { api } = useContext(CarouselContext);
  return (
    <button type="button" aria-label="Next slide" className={cn("absolute grid place-items-center rounded-full border", className)} onClick={() => api?.scrollNext()} {...props}>
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}
