'use client'
import "./globals.css"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
  import dynamic from 'next/dynamic'

const UserProvider = dynamic(() => import('./lib/UserContext'), { ssr: false })

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>
        <UserProvider>
          <Header />
            {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
