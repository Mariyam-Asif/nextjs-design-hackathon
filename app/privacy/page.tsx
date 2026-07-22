import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="Privacy Policy" showLogo={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy & Data Security</h1>
            <p className="text-sm text-gray-500">Last updated: July 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
            <p className="leading-relaxed">
              When you browse our online store, place an order, or contact us through our customer support form, we collect information necessary to process your request. This includes your name, shipping address, email address, phone number, and order preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. How We Use Your Data</h2>
            <p className="leading-relaxed">
              Your personal information is used exclusively to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Process and fulfill your order requests and deliver products.</li>
              <li>Provide order tracking updates, invoice confirmation, and customer service.</li>
              <li>Improve website experience, security, and performance.</li>
              <li>Send promotional newsletters only if you explicitly subscribe.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Data Protection & Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard encryption, SSL data protection protocols, and restricted access mechanisms to safeguard your personal credentials. We do not sell, rent, or lease customer data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">4. Cookies & Session Storage</h2>
            <p className="leading-relaxed">
              Our application utilizes local browser storage and minimal functional cookies to persist cart state, wishlist selections, comparison items, and banner dismissals for a seamless shopping experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. Your Privacy Rights</h2>
            <p className="leading-relaxed">
              You have the right to request access to your personal stored data, request updates or corrections, or request complete deletion of your profile history by contacting our support team at <a href="mailto:privacy@funiro.com" className="text-[#B88E2F] underline font-semibold">privacy@funiro.com</a>.
            </p>
          </section>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
