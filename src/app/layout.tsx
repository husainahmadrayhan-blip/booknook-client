import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
export const metadata: Metadata = { title: "BookNook | Your next chapter starts here", description: "A welcoming community library to discover, borrow and share books." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Toaster position="top-right" richColors closeButton/></body></html>;
}
