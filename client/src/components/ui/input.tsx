import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
<input
  type={type}
  className={cn(
    "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    "h-8 px- py-5 sm:h-10 sm:px-3 sm:py-8  lg:px-5  xl:h-12 xl:px-6 xl:py-5",
    className
  )}
  ref={ref}
  {...props}
/>
    )
  }
)
Input.displayName = "Input"

export { Input }
