import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
  })
  
export const cal = localFont({
    src: "../assets/fonts/CalSans-SemiBold.woff2",
    variable: "--font-cal",
  })