import Image from "next/image";
import setup1 from "@/public/setup-1.png";
import setup2 from "@/public/setup-2.png";
import setup3 from "@/public/setup-3.jpg";
import setup4 from "@/public/setup-4.png";
import setup5 from "@/public/setup-5.jpg";
import setup6 from "@/public/setup-6.jpg";
import setup7 from "@/public/setup-7.png";
import setup8 from "@/public/setup-8.jpg";
import setup9 from "@/public/setup-9.png";


export default function Share() {
  return (
    <section aria-label="Social media gallery" className="text-center py-12 sm:py-16 overflow-hidden">
      <div className="flex flex-col justify-center items-center mb-8 px-4">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-[#616161]">
          Share your setup with
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#3A3A3A] tracking-tight">
          #FuniroFurniture
        </h3>
      </div>
      {/* Image Gallery */}

      <div className="w-full overflow-x-auto no-scrollbar pb-4 px-4">
        <div className="flex flex-row gap-3 sm:gap-4 min-w-max mx-auto justify-center items-center">
          {/* First Div */}
          <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
            <Image
              src={setup1}
              alt="Setup 1"
              className="object-cover w-[140px] h-[220px] sm:w-[180px] sm:h-[320px] lg:w-[230px] lg:h-[382px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={setup2}
              alt="Setup 2"
              className="object-cover w-[180px] h-[160px] sm:w-[230px] sm:h-[240px] lg:w-[355px] lg:h-[323px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
            <Image
              src={setup3}
              alt="Setup 3"
              className="object-cover w-[180px] h-[200px] sm:w-[260px] sm:h-[280px] lg:w-[380px] lg:h-[312px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={setup4}
              alt="Setup 4"
              className="object-cover w-[180px] h-[160px] sm:w-[240px] sm:h-[200px] lg:w-[355px] lg:h-[242px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
            <Image
              src={setup5}
              alt="Setup 5"
              className="object-cover w-[180px] h-[260px] sm:w-[240px] sm:h-[320px] lg:w-[310px] lg:h-[392px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
            <Image
              src={setup6}
              alt="Setup 6"
              className="object-cover w-[180px] h-[200px] sm:w-[250px] sm:h-[280px] lg:w-[350px] lg:h-[348px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={setup7}
              alt="Setup 7"
              className="object-cover w-[120px] h-[150px] sm:w-[150px] sm:h-[200px] lg:w-[178px] lg:h-[242px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
            <Image
              src={setup8}
              alt="Setup 8"
              className="object-cover w-[200px] h-[240px] sm:w-[280px] sm:h-[340px] lg:w-[380px] lg:h-[433px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={setup9}
              alt="Setup 9"
              className="object-cover w-[150px] h-[130px] sm:w-[200px] sm:h-[160px] lg:w-[258px] lg:h-[196px] rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
