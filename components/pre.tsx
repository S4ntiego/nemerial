import { cn } from "@/lib/utils"
import { CopyButton } from "./copyButton"

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  raw?: string
  src?: string
  withMeta?: boolean,
}

export const Pre = ({ className, raw, src, style, ...props }: PreProps) => {

  console.log({...props})
  const lang = props["data-language"] || "shell"

  return (
    <pre
          className={cn(
            "overflow-x-auto py-2 text-[13px] leading-6",
            className
          )}
          {...props}
        />
  )
}
