
import { Analytics } from "@/components/analytics"
import "@/styles/globals.css"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/themeProvider"
import { ModeToggle } from "@/components/mode-toggle"
import { inter, cal } from "@/lib/fonts"



export const metadata: Metadata = {
  title: "Gamificent",
  description: "Personal view on gaming, as seen by Adam Ksiazek.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          cal.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1"><ModeToggle/>{children}</div>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
