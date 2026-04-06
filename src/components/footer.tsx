import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <section className="flex justify-between border-b border-gray-700 pb-10 mb-7 flex-col md:flex-row gap-10">
          <div>
            <ul className="flex flex-col md:flex-row justify-content space-x-0 md:space-x-12 space-y-4 md:space-y-0 gap-4">
              <li>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">COMPANY</h1>
                  <a href="#">
                    <p className='text-gray-300'>About</p>
                  </a>
                  <a href="#" className='text-gray-300'>
                    <p>Features</p>
                  </a>
                  <a href="#" className='text-gray-300'>
                    <p>Privacy Policy</p>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">LEGAL</h1>
                  <a href="#" className='text-gray-300'>
                    <p>Pricing</p>
                  </a>
                  <a href="#" className='text-gray-300'>
                    <p>Refund Policy</p>
                  </a>
                  <a href="#" className='text-gray-300'>
                    <p>Terms of Service</p>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">CONTACT</h1>
                  <a href="#" className='text-gray-300'>
                    <p>Contact</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-4xl font-bold">SYNTHESIS</h1>
            <h2 className="text-4xl">LABS</h2>
          </div>
        </section>
        <section className='flex justify-between flex-col md:flex-row gap-4'>
          <p className="text-center text-gray-500">© 2026 Synthesis Labs. All rights reserved.</p>
          <div className='flex justify-center'>
            <FacebookIcon className='text-gray-500 hover:text-gray-300 cursor-pointer mx-2' aria-label="Facebook" />
            <InstagramIcon className='text-gray-500 hover:text-gray-300 cursor-pointer mx-2' aria-label="Instagram" />
            <PinterestIcon className='text-gray-500 hover:text-gray-300 cursor-pointer mx-2' aria-label="Pinterest" />
          </div>
        </section>
      </div>
    </footer>
  )
}