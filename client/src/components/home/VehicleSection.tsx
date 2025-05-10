import { Check, Info } from "lucide-react";

// Define vehicle images as base64 strings (we'll replace with actual images later)
// For now we'll use placeholders
const kdhVan = "https://via.placeholder.com/400x250?text=Toyota+Hiace+KDH";
const priusImg = "https://via.placeholder.com/400x250?text=Toyota+Prius";

interface VehicleItem {
  id: number;
  name: string;
  image: string;
  type: string;
  description?: string;
  isPopular?: boolean;
  isLuxury?: boolean;
}

const vehicles: VehicleItem[] = [
  {
    id: 1,
    name: "Toyota Hiace KDH Van",
    image: kdhVan,
    type: "Most Popular",
    description: "Comfortable minivan for group tours",
    isPopular: true
  },
  {
    id: 2,
    name: "Toyota Prius 3rd Gen Car",
    image: priusImg,
    type: "Luxury Travel",
    description: "Eco-friendly luxury sedan",
    isLuxury: true
  }
];

const VehicleSection = () => {
  return (
    <section className="bg-white py-16 dark:bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Travel in Comfort & Style</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Experience top-tier comfort and safety with our premium tour vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-64 object-cover" />
                <span className={`absolute top-4 right-4 py-1 px-3 rounded-full text-sm font-medium ${vehicle.isLuxury ? 'bg-accent text-white' : 'bg-primary text-white'}`}>
                  {vehicle.type}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{vehicle.name}</h3>
                {vehicle.description && (
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">{vehicle.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-neutral-900 dark:text-white">
                      Included:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Car, fuel, driver</span>
                      </li>
                      <li className="flex items-center">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Driver accommodation</span>
                      </li>
                      <li className="flex items-center">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Highway toll fee, parking</span>
                      </li>
                      <li className="flex items-center">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Paging service</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-neutral-900 dark:text-white">
                      Excluded:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Entrance tickets</span>
                      </li>
                      <li className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Train & boat tickets</span>
                      </li>
                      <li className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-2" />
                        <span className="text-neutral-700 dark:text-neutral-300">Boat safari fees</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleSection;