import '../globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function PublicLayout({
  children
}: any) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}