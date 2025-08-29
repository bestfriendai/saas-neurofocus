import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        focus:
          "border-transparent bg-focus-500 text-white hover:bg-focus-600",
        // Task priority badges
        'priority-high':
          "border-transparent bg-red-500/10 text-red-500 border-red-500/20",
        'priority-medium':
          "border-transparent bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        'priority-low':
          "border-transparent bg-green-500/10 text-green-600 border-green-500/20",
        // Task status badges
        'status-todo':
          "border-transparent bg-gray-500/10 text-gray-500 border-gray-500/20",
        'status-progress':
          "border-transparent bg-blue-500/10 text-blue-500 border-blue-500/20",
        'status-completed':
          "border-transparent bg-green-500/10 text-green-500 border-green-500/20",
        'status-cancelled':
          "border-transparent bg-red-500/10 text-red-500 border-red-500/20",
        // Energy level badges
        'energy-high':
          "border-transparent bg-green-500/10 text-green-500 border-green-500/20 animate-pulse",
        'energy-medium':
          "border-transparent bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        'energy-low':
          "border-transparent bg-red-500/10 text-red-500 border-red-500/20",
        // Category badges
        work: "border-transparent bg-blue-500/10 text-blue-500 border-blue-500/20",
        personal: "border-transparent bg-green-500/10 text-green-500 border-green-500/20",
        health: "border-transparent bg-red-500/10 text-red-500 border-red-500/20",
        learning: "border-transparent bg-purple-500/10 text-purple-500 border-purple-500/20",
        creative: "border-transparent bg-pink-500/10 text-pink-500 border-pink-500/20",
        admin: "border-transparent bg-gray-500/10 text-gray-500 border-gray-500/20",
        social: "border-transparent bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        home: "border-transparent bg-orange-500/10 text-orange-500 border-orange-500/20"
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }