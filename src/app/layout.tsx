import { Syne as syne } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ApolloClientProvider from "./libs/providers/ApolloClientProvider/ApolloClientProvider";
import ReduxProvider from "./libs/providers/ReduxProvider/ReduxProvider";

const syneFont = syne({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "JujuAGI - Home",
  description: "AI Powered content assistant",
};

/**
 *
 * @return {void}
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className={syneFont.className}>
          <ReduxProvider>
            <ApolloClientProvider>
              <NextTopLoader color="#4C35DD" />
              <ToastContainer
                autoClose={5000}
                closeOnClick
                draggable
                hideProgressBar={false}
                newestOnTop={false}
                pauseOnFocusLoss
                pauseOnHover
                position="top-right"
                rtl={false}
                theme="dark"
              />
              {children}
            </ApolloClientProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
