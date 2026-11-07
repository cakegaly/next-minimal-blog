"use client"

import Link from "next/link"
import { ArrowLeftIcon, FileQuestionIcon, HouseIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Empty className="min-h-svh">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionIcon />
        </EmptyMedia>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you are looking for does not exist or has been moved.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          <HouseIcon />
          Home
        </Link>
        <Button variant="ghost" onClick={() => window.history.back()}>
          <ArrowLeftIcon />
          Back
        </Button>
      </EmptyContent>
    </Empty>
  )
}
