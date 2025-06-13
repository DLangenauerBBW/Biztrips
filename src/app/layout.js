import "./globals.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />  
      </head>
      <body>
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
