import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

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
        <main className="font-juju-primary">
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
        </main>
      </body>
    </html>
  );
}
