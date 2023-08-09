import "./globals.css"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


export const metadata = {
    title: "Giggers",
    description: "A Gig Worker Portal",
}

export default function RootLayout({ children, } : { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="web-icon.png"/>
            </head>
            <body>
                {/* we can notice how the app is divided by 3 section -> Navbar, main, and Footer */}
                {/* the Navbar and the Footer will always be available through the whole app */}
                {/* thus, the layout will always render them */}
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}

