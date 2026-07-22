import Image from "next/image";
import hero from "@/public/hero-image.jpg";
import Link from "next/link";
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
    <section aria-label="Hero section" className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[88vh] min-h-[500px] max-h-[850px] overflow-hidden bg-gray-100">
      <Image
        src={heroData?.backgroundImage || hero}
        alt="Featured living room furniture collection"
        fill
        className="object-cover object-center transition-transform duration-700 hover:scale-103"
        priority
      />
      
      {/* Floating CTA Overlay Box */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 lg:right-12 xl:right-16 bg-[#FFF3E3]/95 w-[90%] sm:w-[380px] md:w-[420px] lg:w-[450px] p-5 sm:p-6 lg:p-7 rounded-xl shadow-xl backdrop-blur-xs border border-[#F5E6D3] transition-all duration-300">
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <span className="text-[#333333] text-xs font-bold tracking-wider uppercase text-[#B88E2F]">
            New Arrival
          </span>
          
          <h1 className="text-[#B88E2F] text-xl sm:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
            {heroData?.headline || "Discover Our New Collection"}
          </h1>
          
          <p className="text-[#333333]/80 text-xs sm:text-sm font-normal leading-relaxed">
            {heroData?.subheadline || "Explore our latest hand-crafted furniture collection designed to elevate your living spaces with timeless elegance."}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={heroData?.primaryCtaUrl || "/shop"}
              className="inline-flex items-center justify-center bg-[#B88E2F] hover:bg-[#a87726] text-white font-bold py-2.5 px-6 sm:py-3 sm:px-7 text-xs sm:text-sm rounded-sm tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF3E3]"
            >
              {heroData?.primaryCtaText || "BUY NOW"}
            </Link>

            {heroData?.secondaryCtaText && heroData?.secondaryCtaUrl && (
              <Link
                href={heroData.secondaryCtaUrl}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#B88E2F] border border-[#B88E2F] font-bold py-2.5 px-5 sm:py-3 sm:px-6 text-xs sm:text-sm rounded-sm tracking-wider uppercase transition-all duration-300 shadow-2xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF3E3]"
              >
                {heroData.secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
