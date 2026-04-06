import CardTestimonials from '@/components/ui/cardTestimonials';

export default function Testimonials() {
  return (
      <div className='w-full bg-white rounded-sm py-11 flex flex-col px-4 lg:px-10'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-10'>Testimonials</h1>
        <ul className='w-full flex flex-col lg:flex-row items-center justify-center gap-5'>
          <li>
            <CardTestimonials
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
              autor="John Doe - CEO of Company X"
            />
          </li>
          <li>
            <CardTestimonials
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
              autor="Jane Smith - CTO of Company Y"
            />
          </li>
          <li>
            <CardTestimonials
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
              autor="Bob Johnson - COO of Company Z"
            />
          </li>
        </ul>
      </div>
  );
}