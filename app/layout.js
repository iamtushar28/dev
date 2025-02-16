import MobileSidebar from "./components/MobileSidebar";
import Navbar from "./components/Navbar";
import "./globals.css";
import ReduxProvider from "./redux-store/ReduxProvider"; // Import Redux Provider

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-100">
        <ReduxProvider>
          <Navbar/>
          <MobileSidebar/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
