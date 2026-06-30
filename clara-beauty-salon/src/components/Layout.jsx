import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
