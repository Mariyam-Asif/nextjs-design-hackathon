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
    <div className="text-center">
      <div className="flex flex-col justify-center items-center mt-[67px]">
        <h2 className="text-xl font-semibold text-[#616161]">
          Share your setup with
        </h2>
        <h2 className="text-[40px] font-bold text-[#3A3A3A]">
          #FuniroFurniture
        </h2>
      </div>
      {/* Image Gallery */}

      <div className="flex flex-row gap-4">
        {/* First Div */}

        <div className="overflow-hidden">
          <Image
            src={setup1}
            alt="Setup 1"
            className="object-cover sm:w-[100px] sm:h-[382px] w-[230px] h-[323px] hover:scale-105 transition-transform duration-300 mb-4"
          />
          <Image
            src={setup2}
            alt="Setup 2"
            className="object-cover  sm:w-[230px] sm:h-[323px] w-[355px] h-[242px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden">
          <Image
            src={setup3}
            alt="Setup 3"
            className="object-cover mt-[43px] sm:w-[380px] sm:h-[312px] w-[230px] h-[323px] hover:scale-105 transition-transform duration-300 mb-4"
          />
          <Image
            src={setup4}
            alt="Setup 4"
            className="object-cover w-[355px] h-[242px] mr-[327px] sm:w-[355px] sm:h-[242px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden hidden sm:block">
          <Image
            src={setup5}
            alt="Setup 5"
            className="object-cover mt-[129px] w-[310px] h-[392px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden hidden sm:block">
          <Image
            src={setup6}
            alt="Setup 6"
            className="object-cover mt-[72px] w-[350px] h-[348px] hover:scale-105 transition-transform duration-300 mb-4"
          />
          <Image
            src={setup7}
            alt="Setup 7"
            className="object-cover w-[178px] h-[242px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden hidden sm:block">
          <Image
            src={setup8}
            alt="Setup 8"
            className="object-cover w-[380px] h-[433px] hover:scale-105 transition-transform duration-300 mb-4"
          />
          <Image
            src={setup9}
            alt="Setup 9"
            className="object-cover w-[258px] h-[196px] mr-[116px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
