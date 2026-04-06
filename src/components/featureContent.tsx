import CardFeature from '@/components/ui/cardFeature';
import PollIcon from '@mui/icons-material/Poll';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';

export default function FeaturesContent() {
    return (
        <section className='w-full bg-white rounded-sm py-11 flex flex-col lg:px-10 px-4'>
            <h1 className='text-3xl font-bold mb-10'>Feature Content</h1>
            <ul className='w-full flex flex-col lg:flex-row items-center justify-center gap-5'>
                <li>
                    <CardFeature 
                    icon={<PollIcon style={{ fontSize: 40, color: '#3b82f6' }} />} 
                    title="DATA VISUALIZATION" 
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
                <li>
                    <CardFeature 
                    icon={<PaidIcon style={{ fontSize: 40, color: '#3b82f6' }} />} 
                    title="SECURE INFRASTRUCTURE" 
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
                <li>
                    <CardFeature 
                    icon={<PeopleIcon style={{ fontSize: 40, color: '#3b82f6' }} />} 
                    title="TEAM COLLABORATION" 
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eos commodi. Commodi, debitis animi beatae explicabo hic aliquam." 
                    />
                </li>
            </ul>
       </section>
    );
}