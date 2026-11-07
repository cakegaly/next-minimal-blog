import {
  CircleXIcon,
  FileTextIcon,
  InfoIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type CalloutType = "info" | "note" | "warning" | "danger"

const calloutStyles: Record<
  CalloutType,
  { icon: LucideIcon; title: string; className: string }
> = {
  info: {
    icon: InfoIcon,
    title: "Info",
    className:
      "border-blue-200 bg-blue-50/50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300",
  },
  note: {
    icon: FileTextIcon,
    title: "Note",
    className: "bg-muted/50",
  },
  warning: {
    icon: TriangleAlertIcon,
    title: "Warning",
    className:
      "border-amber-200 bg-amber-50/50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300",
  },
  danger: {
    icon: CircleXIcon,
    title: "Danger",
    className:
      "border-red-200 bg-red-50/50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300",
  },
}

interface CalloutProps {
  children?: React.ReactNode
  type?: CalloutType
  title?: string
  className?: string
}

/** MDX callout: `<Callout type="warning" title="...">...</Callout>` */
export function Callout({
  children,
  type = "info",
  title,
  className,
}: CalloutProps) {
  const {
    icon: Icon,
    title: defaultTitle,
    className: typeClassName,
  } = calloutStyles[type]

  return (
    <Alert className={cn("my-6", typeClassName, className)}>
      <Icon />
      <AlertTitle>{title || defaultTitle}</AlertTitle>
      <AlertDescription className="text-foreground/90 [&>p]:my-0 [&>p:not(:first-child)]:mt-4">
        {children}
      </AlertDescription>
    </Alert>
  )
}
