import CheckIcon from '@mui/icons-material/Check';

export default function Pricing() {
    return (
        <div className="container w-full mx-auto">
            <div className='py-7 w-full flex flex-col items-center justify-center text-center gap-4 mt-3'>
                <h1 className='text-4xl text-black font-bold'>Pricing</h1>
                <h2 className='text-xl text-gray-600 max-w-2xl'>The best prices for your business, don't waste time and embrace our idea.</h2>
            </div>
            <ul className="flex flex-col lg:flex-row items-center justify-center gap-10 mb-10">
                <li className="bg-white border border-gray-400 py-6 px-8 rounded-lg w-full lg:w-1/4 lg:h-[800px]">
                    <div className="flex flex-col items-center gap-8">
                        <h2 className="text-2xl font-bold">Started</h2>
                        <h1 className="text-5xl">$19<span className="text-base">/month</span></h1>
                        <button className="bg-black text-white px-9 py-2 rounded hover:bg-gray-700 border border-gray-300">Get Started</button>
                        <ul className="w-full flex flex-col items-start gap-4 border-t border-gray-400">
                            <li className="pt-6">
                                <h1 className="text-xl font-bold">Limited Features</h1>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Basic support</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>10GB storage</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />    
                                <p>Community access</p>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="bg-gray-200 border border-gray-400 py-6 px-8 rounded-lg w-full lg:w-1/4 lg:h-[800px]">
                    <div className="flex flex-col items-center gap-8">
                        <h2 className="text-2xl font-bold">Professional</h2>
                        <h1 className="text-5xl">$49<span className="text-base">/month</span></h1>
                        <button className="bg-black text-white px-9 py-2 rounded hover:bg-gray-700 border border-gray-300">Sign Up</button>
                        <ul className="w-full flex flex-col items-start gap-4 border-t border-gray-400">
                            <li className="pt-6">
                                <h1 className="text-xl font-bold">Limited Features</h1>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Basic support</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>10GB storage</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />    
                                <p>Community access</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Single user</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Limited analytics</p>
                            </li>
                        </ul>
                        <ul className="w-full flex flex-col items-start gap-4 border-t border-gray-400">
                            <li className="pt-6">
                                <h1 className="text-xl font-bold">Other Features</h1>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Priority support</p>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="bg-gray-100 border border-gray-400 py-6 px-8 rounded-lg w-full lg:w-1/4 lg:h-[800px]">
                    <div className="flex flex-col items-center gap-8">
                        <h2 className="text-2xl font-bold">Enterprise</h2>
                        <h1 className="text-5xl">$100<span className="text-base">/month</span></h1>
                        <button className="bg-black text-white px-9 py-2 rounded hover:bg-gray-700 border border-gray-300">Request Quote</button>
                        <ul className="w-full flex flex-col items-start gap-4 border-t border-gray-400">
                            <li className="pt-6">
                                <h1 className="text-xl font-bold">Limited Features</h1>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Basic support</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>10GB storage</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />    
                                <p>Community access</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Single user</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Limited analytics</p>
                            </li>
                        </ul>
                        <ul className="w-full flex flex-col items-start gap-4 border-t border-gray-400">
                            <li className="pt-6">
                                <h1 className="text-xl font-bold">Other Features</h1>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Priority support</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>10GB storage</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />    
                                <p>Community access</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Single user</p>
                            </li>
                            <li className='flex flex-row gap-3'>
                                <CheckIcon className='text-gray-400' />
                                <p>Limited analytics</p>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}