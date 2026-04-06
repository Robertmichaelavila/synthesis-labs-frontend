'use client'

import Image from 'next/image';
import diagram from '@/assets/img/diagram.png'
import { useRouter } from 'next/navigation';

export default function BodySection() {
    const router = useRouter();

    const handleExplore = () => {
    router.push('/signup');
    };

    return(
        <section className="flex flex-col lg:flex-row justify-between items-center py-3 lg:py-8 my-8 px-4 lg:px-0">
            <div className='w-full lg:w-1/2'>
                <h1 className="text-4xl sm:text-4xl lg:text-7xl md:text-4xl">BUILD FASTER,</h1>
                <h2 className="text-4xl sm:text-4xl lg:text-7xl md:text-4xl mb-6">SCALE SMART</h2>
                <p className='w-full lg:w-4/5 text-sm sm:text-base leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam minus maiores reiciendis officiis incidunt aperiam iste, id illum dolorem perspiciatis repudiandae!</p>
                <button
                    onClick={handleExplore} 
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 border border-gray-800 mt-6 text-sm sm:text-lg">
                        EXPLORE THE PLATFORM
                </button>
            </div>
            <div className="hidden lg:block w-full lg:w-1/3">
                <Image 
                    src={diagram} 
                    alt="Architecture diagram of the platform" 
                    loading="eager"
                    width={200} 
                    height={200} 
                    className="w-full h-auto"
                />
            </div>
        </section>
    )
}