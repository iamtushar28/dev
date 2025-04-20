import AuthProvider from "./provider/AuthProvider"; // Import AuthProvider
import MobileSidebar from "./components/MobileSidebar";
import Navbar from "./components/Navbar";
import "./globals.css";
import ReduxProvider from "./redux-store/ReduxProvider"; // Import Redux Provider

export const metadata = {
  title: "DEV | Explore, Learn, Innovate",
  description: "Start updated on the latest tech trends, tutorials, and insights on DEV, your go-to tech Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-100">
        <ReduxProvider>
          <AuthProvider> {/* Wrap with AuthProvider */}
            <Navbar />
            <MobileSidebar />
            {/* <DefaultAlert/> */}
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
