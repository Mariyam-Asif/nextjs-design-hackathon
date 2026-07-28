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
        <div className="w-full mb-6 sm:mb-10">
            <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0 backdrop-blur-xs bg-black/40 z-10"></div>
                <Image
                  src={mainImage}
                  alt="Page header banner background"
                  fill
                  className="object-cover w-full h-full opacity-60"
                  priority
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center">
                    {showLogo && (
                        <Image
                          src={logo}
                          alt="Furniro Logo"
                          className="w-10 h-10 sm:w-14 sm:h-14 mb-2 object-contain"
                        />
                    )}
                  <h1 className="font-bold text-2xl sm:text-3xl lg:text-[48px] text-gray-900 leading-tight mb-2 tracking-tight">
                    {pageName}
                  </h1>
                  <nav aria-label="Breadcrumb" className="font-medium text-xs sm:text-sm md:text-base text-gray-800 flex items-center justify-center gap-1.5 flex-wrap">
                    <Link href="/" className="hover:text-[#B88E2F] cursor-pointer transition-colors font-semibold">
                      Home
                    </Link>
                    <span className="text-gray-500 font-bold">&gt;</span>
                    <span className="font-light text-gray-700">{breadcrumbdName || pageName}</span>
                  </nav>
                </div>
            </div>
        </div>
    )
}