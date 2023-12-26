import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quality Forum",
  description: "Your Views Matter!",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
