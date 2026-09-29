import { cn } from "@/lib/utils"

function Skeleton({ className, change = false, ...props }: React.ComponentProps<"div"> & { change?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md", change ? "bg-primary/10" : "bg-zinc-900/10 dark:bg-zinc-50/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
