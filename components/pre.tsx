import { CopyButton } from "./copyButton"

export const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"] || "shell"

  return (
    <pre {...props} className={"mb-4 mt-6 px-4 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"}>
      <div className={"border-b border-slate-600 text-slate-300 text-sm pb-2 mb-4 flex justify-between items-center"}>
        <p>{lang}</p>
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  )
}
