"use client";

import { X } from "lucide-react";
import { createContext, useContext, type HTMLAttributes, type ReactNode } from "react";

type DialogContextValue = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextValue>({ open: false });

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 py-6" role="dialog" aria-modal="true">
        {children}
      </div>
    </DialogContext.Provider>
  );
}

export function DialogContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { onOpenChange } = useContext(DialogContext);

  return (
    <div className={cn("relative w-full border", className)} {...props}>
      <button
        type="button"
        aria-label="Close dialog"
        onClick={() => onOpenChange?.(false)}
        className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/45 text-white transition hover:border-[#d9b27a] hover:text-[#d9b27a]"
      >
        <X className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={className} {...props} />;
}
