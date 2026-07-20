import Image from "next/image";
import hero from "@/public/hero-image.jpg";
import Link from "next/link";
import Head from "next/head";
import { client } from "@/sanity/lib/client";

async function fetchHero() {
  try {
    const query = `
      *[_type == "hero" && isActive == true][0] {
        headline,
        subheadline,
        "backgroundImage": backgroundImage.asset->url,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl
      }
    `;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching hero from Sanity:", error);
    return null;
  }
}

export default async function Hero() {
  const heroData = await fetchHero();

  return (
    <>
    {/* Preloading hero image*/}
    <Head>
      <link
      rel="preload"
      href={heroData?.backgroundImage || "/hero-image.jpg"}
      as="image"
      type="image/jpg"
      crossOrigin="anonymous"
      />
    </Head>
    <div className="relative w-full h-[50vh] sm:h-[60vh] sm:w-[140vw] md:w-[100vw] md:h-[70vh] lg:h-[90vh] overflow-hidden">
      <Image
        src={heroData?.backgroundImage || hero}
        alt="image of a living room with furnitures."
        layout="fill"
        className="object-cover object-center sm:object-top md:object-center lg:object-center transition-transform duration-700 hover:scale-105"
        priority
      />
      <div className="absolute top-[20%] right-[5%] md:top-[28%] md:right-[4%] lg:top-[30%] lg:right-[5%] xl:top-[25%] xl:right-[5%] 2xl:top-[22%] 2xl:right-[6%] bg-[#FFF3E3] w-[50%] sm:w-[40%] md:w-[40%] lg:w-[38%] h-auto flex flex-col items-center justify-between p-6 rounded-xl transform transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl">
        <div className="h-full space-y-4">
          <h3 className="text-[#333333] text-xs sm:text-sm md:text-base font-semibold transition-opacity saturate-50 hover:opacity-80">
            New Arrival
          </h3>
          <h2 className="text-[#B88E2F] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug font-bold transition-transform duration-500 hover:scale-105">
            {heroData?.headline || "Discover Our New Collection"}
          </h2>
          <h3 className="text-[#333333] text-xs sm:text-sm md:text-base font-medium overflow-hidden transition-opacity duration-500 hover:opacity-80">
            {heroData?.subheadline || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis."}
          </h3>
          <div className="flex gap-2">
            <button>
              <Link href={heroData?.primaryCtaUrl || "/shop"} className="bg-[#B88E2F] text-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-xs sm:text-sm md:text-base font-bold transition-all duration-500 hover:bg-[#a87726] hover:shadow-2xl hover:-translate-y-1 hover:scale-110">
                {heroData?.primaryCtaText || "BUY NOW"}
              </Link>
            </button>
            {heroData?.secondaryCtaText && heroData?.secondaryCtaUrl && (
              <button>
                <Link href={heroData.secondaryCtaUrl} className="bg-white text-[#B88E2F] border border-[#B88E2F] py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-xs sm:text-sm md:text-base font-bold transition-all duration-500 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 hover:scale-110">
                  {heroData.secondaryCtaText}
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
