import Link from "next/link";
import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="Return Policy" showLogo={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Hassle-Free Returns & Refunds</h1>
            <p className="text-gray-600 leading-relaxed">
              We want you to love your furniture. If a product does not meet your expectations, we offer a straightforward 30-day return window.
            </p>
          </div>

          {/* Key Return Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFF3E3]/50 border border-[#F5E6D3] p-6 rounded-2xl">
              <span className="text-2xl mb-2 block">📅</span>
              <h3 className="font-bold text-gray-900 text-lg mb-1">30-Day Window</h3>
              <p className="text-sm text-gray-600">Return any item within 30 days of delivery for a full refund.</p>
            </div>

            <div className="bg-[#FFF3E3]/50 border border-[#F5E6D3] p-6 rounded-2xl">
              <span className="text-2xl mb-2 block">🚚</span>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Free Damaged Returns</h3>
              <p className="text-sm text-gray-600">Free pickup for items damaged during transit or manufacturing flaws.</p>
            </div>

            <div className="bg-[#FFF3E3]/50 border border-[#F5E6D3] p-6 rounded-2xl">
              <span className="text-2xl mb-2 block">💳</span>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Fast Processing</h3>
              <p className="text-sm text-gray-600">Refunds processed back to your original payment method within 3–5 business days.</p>
            </div>
          </div>

          {/* Detailed Policy Sections */}
          <div className="space-y-8 text-gray-700">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Return Eligibility Criteria</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Items must be in original condition, unused, and un-assembled.</li>
                <li>Original packaging and protective padding must be intact where possible.</li>
                <li>Proof of purchase (order number or invoice confirmation) must be provided.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">How to Initiate a Return</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                <li>Visit our <Link href="/contact" className="text-[#B88E2F] font-semibold underline">Contact Support</Link> page or email <a href="mailto:returns@funiro.com" className="text-[#B88E2F] font-semibold underline">returns@funiro.com</a>.</li>
                <li>Provide your order number and photo of the item/packaging.</li>
                <li>Our logistics team will schedule a convenient pickup window at your address.</li>
                <li>Once inspected at our warehouse, your refund will be issued immediately.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
