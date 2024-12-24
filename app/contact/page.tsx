import Banner from "../components/Banner";
import address from "@/public/address.svg";
import phone from "@/public/phone.svg";
import hours from "@/public/hours.svg";
import Image from "next/image";
import Guarantees from "../components/Guarantees";

export default function Contact() {
  return (
    <div>
      <Banner pageName="Contact" showLogo={true} />
      <div className="flex flex-col items-center justify-center mt-24">
        <h2 className="font-semibold text-[36px]">Get In Touch With Us</h2>
        <p className="font-normal text-sm md:text-base text-[#9F9F9F] text-center">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us
          <br className="hidden md:inline"/>
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-48 gap-8 md:mt-4 mt-10">
        {/* Info Div */}
        <div className="flex flex-col justify-center md:items-start items-center gap-6">
          <div className="flex md:items-start items-center text-center md:text-start gap-4 md:gap-8">
            <Image src={address} alt="address" />
            <div className="flex flex-col">
              <h3 className="font-medium text-2xl">Address</h3>
              <p className="font-normal text-base">
                236 5th SE Avenue, New<br/>
                
                York NY10000, United
                <br/>
                States
              </p>
            </div>
          </div>
          <div className="flex md:items-start items-center text-center md:text-start gap-4 md:gap-8">
            <Image src={phone} alt="phone" />
            <div className="flex flex-col">
              <h3 className="font-medium text-xl md:text-2xl">Phone</h3>
              <p className="font-normal text-sm md:text-base">
                Mobile: +(84) 546-6789
                <br/>
                Hotline: +(84) 456-6789
              </p>
            </div>
          </div>
          <div className="flex md:items-start items-center text-center md:text-start gap-4 md:gap-8">
            <Image src={hours} alt="working hours" />
            <div className="flex flex-col">
              <h3 className="font-medium text-xl md:text-2xl">Working Time</h3>
              <p className="font-normal text-sm md:text-base">
                Monday-Friday: 9:00 -
                22:00
                <br/>
                Saturday-Sunday: 9:00 -
                21:00
              </p>
            </div>
          </div>
        </div>
        {/* Contact form - right side */}
        <div className="w-full md:w-1/2 p-4 md:p-8 pt-0 md:pt-[87px] my-4 md:my-0">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-medium ">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Abc"
                className="mt-2 w-full px-4 py-3 border border-[#9F9F9F] rounded-[10px]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Abc@def.com"
                className="mt-2 w-full px-4 py-3 border border-[#9F9F9F] rounded-[10px]"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-base font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="This is optional"
                className="mt-2  w-full px-4 py-3 border border-[#9F9F9F] rounded-[10px] "
              ></input>
            </div>
            <div>
              <label htmlFor="message" className="block text-base font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Hi! i’d like to ask about"
                className="mt-2  w-full px-4 py-3 border border-[#9F9F9F] rounded-[10px]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-6 bg-[#B88E2F] font-normal text-base text-white py-3 px-16 rounded-md w-full md:w-auto transition-transform transform hover:scale-105 hover:shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Guarantees />
    </div>
  );
}
