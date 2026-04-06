import Image from 'next/image';

export default function CardStudies({ title, description, src, alt }: { title: string; description: string; src: any; alt: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <section className='flex flex-col md:flex-row justify-between mb-5 gap-3'>
        <Image 
          src={src}
          alt={alt}
          className="rounded-md w-full md:w-[200px] h-auto"
        />
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm sm:text-base">{description}</p>
        </div>
      </section>

      <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold">
        <p className='border-b border-gray-400 w-fit hover:border-gray-700'>VIEW DETAILS</p>
      </a>
    </div>
  );
}