import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, change = false, ...props }: React.ComponentProps<"input"> & { change?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        change ? "selection:bg-primary selection:text-primary-foreground hover:border-ring focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring" : "selection:bg-zinc-900 selection:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 hover:border-zinc-900 dark:hover:border-zinc-50 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-50 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
