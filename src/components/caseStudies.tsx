import CardStudies from '@/components/ui/cardStudies';
import reuniaoOne from '@/assets/img/reuniaoOne.jpg';
import reuniaoTwo from '@/assets/img/reuniaoTwo.jpg';

export default function CaseStudies() {
    return (
        <div className='w-full bg-gray-200 rounded-sm py-11 flex flex-col px-4 lg:px-10'>
            <h1 className='text-black text-2xl sm:text-3xl font-bold mb-10'>Case Studies</h1>
            <ul className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                <li>
                    <CardStudies 
                        src={reuniaoOne}
                        alt='Data Visualization'
                        title="DATA VISUALIZATION" 
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
                <li>
                    <CardStudies
                        src={reuniaoTwo}
                        alt='Secure Infrastructure'
                        title="SECURE INFRASTRUCTURE" 
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
                <li>
                    <CardStudies 
                        src={reuniaoOne}
                        alt='Real-time Analytics'
                        title="REAL-TIME ANALYTICS" 
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
                <li>
                    <CardStudies
                        src={reuniaoTwo}
                        alt='API Integration'
                        title="API INTEGRATION" 
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
            </ul>
        </div>
    );
}