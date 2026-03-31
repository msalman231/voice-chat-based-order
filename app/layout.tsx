import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className={cn("font-sans", inter.variable)}>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui",
          background: "#0f172a",
          color: "white",
        }}
      >
        {/* HEADER */}

        <header
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Restaurant AI</h2>

          <nav
            style={{
              display: "flex",
              gap: 20,
            }}
          >
            <Link href="/chat">Chat</Link>

            <Link href="/voice">Voice</Link>
          </nav>
        </header>

        {/* PAGE CONTENT */}

        <main
          style={{
            height: "calc(100vh - 72px)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
