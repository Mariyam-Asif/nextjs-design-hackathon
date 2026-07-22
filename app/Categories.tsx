import Image from "next/image";
import Link from "next/link";
import dining from "@/public/dining-category.png";
import living from "@/public/living-category.png";
import bedroom from "@/public/bedroom-category.png";

const categories = [
  { name: "Dining", image: dining, slug: "dining" },
  { name: "Living", image: living, slug: "living" },
  { name: "Bedroom", image: bedroom, slug: "bedroom" },
];

export default function Categories() {
  return (
    <section aria-label="Product categories" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-8 sm:mb-12 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#333333] mb-2 tracking-tight">
          Browse The Range
        </h2>
        <p className="font-normal text-sm sm:text-base lg:text-lg text-[#666666] max-w-xl">
          Explore our carefully curated room collections designed for every corner of your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-4 rounded-2xl"
          >
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[480px] overflow-hidden rounded-2xl bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-500">
              <Image
                src={cat.image}
                alt={`${cat.name} furniture collection`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            
            <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-[#333333] mt-5 group-hover:text-[#B88E2F] transition-colors">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
