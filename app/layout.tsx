
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
          "min-h-screen bg-zinc-900 selection:bg-purple-500/90 selection:text-white font-sans antialiased",
          inter.variable,
          cal.variable
        )}
      >
              <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="h-full bg-[url('https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9')] bg-top bg-no-repeat opacity-[0.3] will-change-transform"></div></div>
        <ThemeProvider attribute="class" defaultTheme="dark">
        <svg className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light" width="100%" height="100%">
                    <filter id="pedroduarteisalegend">
                        <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch"></feTurbulence>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#pedroduarteisalegend)"></rect>
                </svg>
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
