import "./globals.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
