import Image from "next/image";
import quality from "@/public/quality-icon.svg";
import warranty from "@/public/warranty-icon.svg";
import shipping from "@/public/shipping-icon.svg";
import support from "@/public/support-icon.svg";

export default function Guarantees(){
    return (
        <div className="bg-[#FAF3EA] px-6 sm:px-6 py-[50px] sm:py-[100px]">
            <div className="flex flex-wrap justify-center items-center  lg:flex-row lg:justify-between gap-6 lg:gap-4">
                <div className="flex gap-[10px] group hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg rounded-lg hover:p-1">
                    <Image src={quality} alt="Quality" className="transition-all duration-300 group-hover:opacity-80"/>
                    <div className="flex flex-col group-hover:text-[#242424] transition-all duration-300">
                        <h3 className="font-semibold text-[20px] sm:text-[25px] text-[#242424]">High Quality</h3>
                        <p className="text-[#898989] font-medium text-lg sm:text-xl group-hover:text-[#B88E2F] transition-all duration-300">crafted from top materials</p>
                    </div>
                </div>
                <div className="flex gap-[10px] group hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg rounded-lg hover:p-1">
                    <Image src={warranty} alt="Warranty Protection" className="transition-all duration-300 group-hover:opacity-80"/>
                    <div className="flex flex-col group-hover:text-[#242424] transition-all duration-300">
                        <h3 className="font-semibold text-[20px] sm:text-[25px] text-[#242424]">Warranty Protection</h3>
                        <p className="text-[#898989] font-medium text-lg sm:text-xl group-hover:text-[#B88E2F] transition-all duration-300">Over 2 years</p>
                    </div>
                </div>
                <div className="flex gap-[10px] group hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg rounded-lg hover:p-1">
                    <Image src={shipping} alt="Free Shipping" className="transition-all duration-300 group-hover:opacity-80"/>
                    <div className="flex flex-col group-hover:text-[#242424] transition-all duration-300">
                        <h3 className="font-semibold text-[20px] sm:text-[25px] text-[#242424]">Free Shipping</h3>
                        <p className="text-[#898989] font-medium text-lg sm:text-xl group-hover:text-[#B88E2F] transition-all duration-300">Order over 150 $</p>
                    </div>
                </div>
                <div className="flex gap-[10px] group hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg rounded-lg hover:p-1">
                    <Image src={support} alt="Customer Support 24/7" className="transition-all duration-300 group-hover:opacity-80"/>
                    <div className="flex flex-col group-hover:text-[#242424] transition-all duration-300">
                        <h3 className="font-semibold text-[20px] sm:text-[25px] text-[#242424]">24 / 7 Support</h3>
                        <p className="text-[#898989] font-medium  text-lg sm:text-xl group-hover:text-[#B88E2F] transition-all duration-300">Dedicated support</p>
                    </div>
                </div>
            </div>
        </div>
    )
}