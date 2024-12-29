import Image from "next/image";
import Link from "next/link";
import mainImage from "@/public/main-image.jpg";
import logo  from "@/public/logo-favicon.svg";

interface BannerProps {
    pageName:string;
    breadcrumbdName?: string;
    showLogo?: boolean;
}

export default function Banner({pageName, breadcrumbdName, showLogo = false}:BannerProps){
    return (
        <div>
            <div className="w-full md:h-[50vh] h-[30vh] relative">
        <div className="absolute backdrop-blur-md bg-black opacity-30"></div>
        <Image
          src={mainImage}
          alt="main image"
          className="object-cover w-full h-full opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showLogo && (
                <Image
                src={logo}
                alt="logo"
                className="w-17 h-17"
                />
            )}
          <h2 className="font-medium text-[48px] text-center">{pageName}</h2>
          <h3 className="font-medium text-base">
            <Link href="/">
              <span className="hover:text-white cursor-pointer transition-all duration-300 mr-[6px]">
                Home
              </span>
            </Link>
            <span className="hover:text-white cursor-default transition-all duration-300">
              &gt; <span className="font-light">{breadcrumbdName || pageName}</span>
            </span>
          </h3>
        </div>
      </div>
        </div>
    )
}