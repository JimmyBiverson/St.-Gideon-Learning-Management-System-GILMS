import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, change = false, ...props }: React.ComponentProps<"textarea"> & { change?: boolean }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        change ? "selection:bg-primary selection:text-primary-foreground hover:border-ring focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring" : "selection:bg-zinc-900 selection:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 hover:border-zinc-900 dark:hover:border-zinc-50 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-50 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
