"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export const CopyButton = ({ text, className, ...props }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Button
    disabled={isCopied}
    size="icon"
    variant="ghost"
    className={cn(
      "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
      className
    )}
    onClick={copy}
    {...props}
  >
    <span className="sr-only">Copy</span>
    {isCopied ? (
      <CheckIcon className="h-4 w-4" />
    ) : (
      <CopyIcon className="h-4 w-4" />
    )}
  </Button>
  )
}
