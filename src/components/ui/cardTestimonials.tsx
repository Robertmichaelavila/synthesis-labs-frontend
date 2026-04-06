export default function CardTestimonials({ description, autor }: { description: string; autor: string }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col w-full">
      <h3 className="text-base sm:text-lg lg:text-lg text-gray-800 font-semibold mb-2">{description}</h3>
      <p className="text-gray-500 text-sm leading-6 italic mt-2">— {autor}</p>
    </div>
  );
}