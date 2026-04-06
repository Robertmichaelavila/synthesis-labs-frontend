import PollIcon from '@mui/icons-material/Poll';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import CardFeature from '@/components/ui/cardFeature';

export default function Pricing() {
    return (
        <div className="container w-full mx-auto">
            <div className='py-7 w-full flex flex-col items-center text-center gap-4 mt-3'>
                <h1 className='text-4xl text-black font-bold'>Features</h1>
                <h2 className='text-xl sm:text-lg md:text-xl text-gray-600 max-w-2xl'>These are our features; see what we have and get inspired to join us on this journey.</h2>
            </div>
            <ul className="flex flex-wrap justify-center gap-6 mb-10 px-4">
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PollIcon className='text-gray-400' />}
                        title="Feature 1"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PaidIcon className='text-gray-400' />}
                        title="Feature 2"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PeopleIcon className='text-gray-400' />}
                        title="Feature 3"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PollIcon className='text-gray-400' />}
                        title="Feature 4"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PaidIcon className='text-gray-400' />}
                        title="Feature 5"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PeopleIcon className='text-gray-400' />}
                        title="Feature 6"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PollIcon className='text-gray-400' />}
                        title="Feature 7"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PaidIcon className='text-gray-400' />}
                        title="Feature 8"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PeopleIcon className='text-gray-400' />}
                        title="Feature 9"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PollIcon className='text-gray-400' />}
                        title="Feature 10"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PaidIcon className='text-gray-400' />}
                        title="Feature 11"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
                <li className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                    <CardFeature
                        icon={<PeopleIcon className='text-gray-400' />}
                        title="Feature 12"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam."
                    />
                </li>
            </ul>
        </div>
    );
}