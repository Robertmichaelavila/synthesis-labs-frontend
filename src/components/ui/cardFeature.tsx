export default function CardFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col w-full transform transition duration-300 ease-in-out hover:scale-105">
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-6">{description}</p>
    </div>
  );
}