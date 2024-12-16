import Image from "next/image";
import dining from "@/public/dining-category.png";
import living from "@/public/living-category.png";
import bedroom from "@/public/bedroom-category.png";


export default function Categories() {
  return (
    <section className="py-[3.5rem] px-[8%] lg:py-[5.5rem] lg:px-[12%] flex flex-col justify-center items-center space-y-8">
      <div className="flex flex-col justify-center items-center mb-[32px]">
        <h2 className="font-bold text-2xl sm:text-3xl l:text-4xl text-[#333333] mb-2">Browse The Range</h2>
        <p className="font-normal text-base sm:text-lg lg:text-xl text-[#666666] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-x-6 lg:gap-8 justify-items-center">
     <div className="flex flex-col items-center justify-center">
      <Image src={dining} alt="dining category" className="cursor-pointer w-[70%] sm:w-[100%] lg:w-[381px] lg:h-[440px] object-cover rounded-lg transition-transform duration-500 hover:scale-105 mb-[30px]"/>
      <h3 className="font-semibold text-lg sm:text-xl text-[#333333]">Dining</h3>
      </div>
      <div className="flex flex-col items-center justify-center">
      <Image src={living} alt="living category" className="cursor-pointer w-[70%] sm:w-[100%] lg:w-[381px] lg:h-[440px] object-cover rounded-lg transition-transform duration-500 hover:scale-105 mb-[30px]"/>
      <h3 className="font-semibold text-lg sm:text-xl text-[#333333]">Living</h3>
      </div>
      <div className="flex flex-col items-center justify-center">
      <Image src={bedroom} alt="bedroom category" className="cursor-pointer w-[70%] sm:w-[100%] lg:w-[381px] lg:h-[440px] object-cover rounded-lg transition-transform duration-500 hover:scale-105 mb-[30px]"/>
      <h3 className="font-semibold text-lg sm:text-xl text-[#333333]">Bedroom</h3>
      </div>
      </div>
    </section>
  );
}
