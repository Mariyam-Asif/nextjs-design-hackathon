import Image from "next/image";
import Link from "next/link";
import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="About Us" showLogo={false} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B88E2F] bg-[#B88E2F]/10 px-3.5 py-1.5 rounded-full">
              Our Journey
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Crafting Timeless Living Spaces Since 2023
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              At Funiro, we believe that your home should be a reflection of your personality and a sanctuary of comfort. Founded with a passion for sustainable materials and fine craftsmanship, we curate contemporary furniture that combines functional elegance with modern aesthetics.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Every piece in our collection is carefully engineered using premium hardwoods, eco-friendly finishes, and ergonomic designs to ensure it elevates your everyday living.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-[#B88E2F] hover:bg-[#9E7A28] text-white font-semibold py-3.5 px-8 rounded-lg transition-colors shadow-sm"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          <div className="relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
            <Image
              src="/hero-image.jpg"
              alt="Craftsmanship and interior design showroom"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Brand Values */}
        <div className="bg-[#FFF3E3]/60 rounded-3xl p-8 sm:p-12 mb-20 border border-[#F5E6D3]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Choose Funiro</h2>
            <p className="text-gray-600 text-sm sm:text-base">We prioritize quality materials, transparent processes, and customer satisfaction above all.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#B88E2F]/10 text-[#B88E2F] flex items-center justify-center mx-auto text-2xl font-bold">
                🌱
              </div>
              <h3 className="text-lg font-bold text-gray-900">Sustainable Materials</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sourced from responsibly managed forests with non-toxic, eco-conscious finishes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#B88E2F]/10 text-[#B88E2F] flex items-center justify-center mx-auto text-2xl font-bold">
                🛠️
              </div>
              <h3 className="text-lg font-bold text-gray-900">Master Craftsmanship</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Hand-finished by experienced artisans with meticulous attention to detail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#B88E2F]/10 text-[#B88E2F] flex items-center justify-center mx-auto text-2xl font-bold">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-gray-900">Guaranteed Quality</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Backed by a 2-year extended structural warranty and dedicated customer service.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
