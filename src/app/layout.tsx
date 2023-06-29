import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "JujuAGI - Home",
  description: "AI Powered content assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <NextTopLoader color="#4C35DD" />
          {children}
        </main>
      </body>
    </html>
  );
}
