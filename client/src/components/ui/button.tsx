import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-customBlue text-primary-foreground hover:bg-primary/90 icon:h-10 icon:w-10 relative mb-5 h-10 relative mb-5 h-8 px-4 py-2 sm:h-10 sm:px-6 sm:py-3 md:h-12 md:px-8 md:py-4 lg:h-16 lg:px-12 lg:py-5xl:h-20 xl:px-16 xl:py-6",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          additionalMethod:
          "border border-input bg-customYellow hover:bg-customYellow/50 icon:h-10 icon:w-10 relative mb-5 h-8 px-4 py-5 sm:h-10 sm:px-6 sm:py-6 md:h-12 md:px-8 md:py-4 lg:h-16 lg:px-16 lg:py-5xl:h-20 xl:px-36 xl:py-6" ,
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-12 py-2",
        sm: "h-9 rounded-md px-24 py-4",
        lg: "h-11 rounded-md px-48 py-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
