import Banner from "../components/Banner";
import Guarantees from "../components/Guarantees";

export default function PaymentOptionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner pageName="Payment Options" showLogo={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Accepted Payment Methods</h1>
            <p className="text-gray-600 leading-relaxed">
              We offer multiple convenient and secure payment options for a seamless checkout experience.
            </p>
          </div>

          {/* Payment Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="text-2xl font-bold text-[#B88E2F]">💳 Credit & Debit Cards</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We accept all major international cards including Visa, MasterCard, American Express, and Discover. All transactions are SSL encrypted.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="text-2xl font-bold text-[#B88E2F]">💵 Cash on Delivery (COD)</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pay with cash directly to our delivery representative upon inspecting your furniture items at your home address.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="text-2xl font-bold text-[#B88E2F]">🏦 Direct Bank Transfer</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transfer payment directly into our official corporate bank account. Instructions are provided upon completing your checkout.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="text-2xl font-bold text-[#B88E2F]">🔒 Secure Online Gateway</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Integrated with 256-bit encrypted security protocols to ensure zero unauthorized access to your account details.
              </p>
            </div>
          </div>

          {/* Frequently Asked Payment Questions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Payment FAQs</h2>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white">
                <h3 className="font-bold text-gray-900 text-base mb-1">When will my card be charged?</h3>
                <p className="text-sm text-gray-600">Your card is authorized and charged immediately upon placing your order online.</p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white">
                <h3 className="font-bold text-gray-900 text-base mb-1">Are there any hidden payment transaction fees?</h3>
                <p className="text-sm text-gray-600">No. The final price displayed at checkout is the exact amount you will pay. Taxes and shipping charges are explicitly detailed before order confirmation.</p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white">
                <h3 className="font-bold text-gray-900 text-base mb-1">Is Cash on Delivery available for all orders?</h3>
                <p className="text-sm text-gray-600">Cash on Delivery is available for all standard residential shipping destinations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Guarantees />
    </div>
  );
}
