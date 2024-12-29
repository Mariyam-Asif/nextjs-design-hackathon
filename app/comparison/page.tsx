import Image from "next/image";
import Banner from "../components/Banner";
import rating1 from "@/public/4.7-rating.svg";
import rating2 from "@/public/4.2-rating.svg";
import product1 from "@/public/product-1.png";
import product2 from "@/public/product-2.png";
import Guarantees from "../components/Guarantees";

export default function Comparison() {
  return (
    <>
      <Banner
        pageName="Product Comparison"
        breadcrumbdName="Comparison"
        showLogo={true}
      />
      <div className="px-8 sm:px-16 lg:px-24">
        {/* Products Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:justify-start items-start md:items-center gap-6">
          <div className="flex flex-col items-start gap-5 w-full sm:w-auto">
            <h3 className="font-medium text-2xl mt-6">
              Go to Product <br className="hidden lg:inline-block" />
              page for more Products
            </h3>
            <button className="text-xl text-[#727272] font-medium text-center">
              View More
              <span className="block w-full h-[2px] bg-[#727272] mt-1"></span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col mr-12 mt-7">
              <Image src={product1} alt="asgaard sofa" className="w-72 h-44" />
              <h3 className="font-medium text-2xl pt-4">Asgaard Sofa</h3>
              <p className="font-medium text-lg pt-1">Rs. 250,000.00</p>
              <div className="flex justify-start items-center pt-2">
                <p className="font-medium text-lg pr-1">4.7</p>
                <Image src={rating1} alt="4.7 star rating" />
                <span className="bg-[#9F9F9F] w-7 h-[1px] block rotate-90"></span>
                <p className="text-[#9F9F9F] text-xs font-normal">204 Review</p>
              </div>
            </div>
            <div className="flex flex-col mr-16">
              <Image
                src={product2}
                alt="outdoor sofa set"
                className="w-72 h-52"
              />
              <h3 className="font-medium text-2xl pt-4">Outdoor Sofa Set</h3>
              <p className="font-medium text-lg pt-1">Rs. 224,000.00</p>
              <div className="flex justify-start items-center pt-2">
                <p className="font-medium text-lg pr-1">4.2</p>
                <Image src={rating2} alt="4.2 star rating" />
                <span className="bg-[#9F9F9F] w-7 h-[1px] block rotate-90"></span>
                <p className="text-[#9F9F9F] text-xs font-normal">145 Review</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center lg:justify-normal items-center lg:items-start w-full mt-3 md:mt-0 md:w-auto">
            <h3 className="font-semibold text-2xl">Add A Product</h3>
            <select
              name="product"
              className="bg-[#B88E2F] text-white text-sm font-semibold px-4 py-2 pr-12 rounded-md focus:outline-none text-center lg:text-start"
            >
              <option value="">Choose a Product</option>
            </select>
          </div>
        </div>
        <div className="bg-[#E8E8E8] border h-full w-full mt-14"></div>
        {/* Product info section */}
        <div className="flex flex-col md:flex-row justify-center pb-28 relative">
          <div>
            <div className="flex flex-col justify-between gap-7 min-w-[220px]">
              <h3 className="font-medium text-3xl mt-11">General</h3>
              <div className="text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>Sales Package</p>
                <p>Model Number</p>
                <p>Secondary Material</p>
                <p>Configuration</p>
                <p>Upholstery Material</p>
                <p>Upholstery Color</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-7 min-w-[220px]">
              <h3 className="font-medium text-3xl mt-12 md:mt-24">Product</h3>
              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>Filling Material</p>
                <p>Finish Type</p>
                <p>Adjustable Headrest</p>
                <p>Maximum Load Capacity</p>
                <p>Origin of Manufacture</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-7 min-w-[220px]">
              <h3 className="font-medium text-3xl mt-12 md:mt-24">Dimensions</h3>
              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>Width</p>
                <p>Height</p>
                <p>Depth</p>
                <p>Weight</p>
                <p>Seat Height</p>
                <p>Leg Height</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-7 min-w-[220px]">
              <h3 className="font-medium text-3xl mt-12 md:mt-24">Warranty</h3>
              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-0">
                <p>Warranty Summary</p>
                <p className="mt-0 md:mt-16">Warranty Service Type</p>
                <p className="mt-0 md:mt-28 xl:mt-14">Covered in Warranty</p>
                <p className="mt-0 md:mt-[121px] xl:mt-14">Not Covered in Warranty</p>
                <p className="mt-0 md:mt-44 xl:mt-20">Domestic Warranty</p>
              </div>
            </div>
          </div>
          <div className="bg-[#E8E8E8] w-[1px] mx-8"></div>
          <div className="min-w-[150px] whitespace-normal break-words">
            <div className="flex flex-col justify-between mt-24">
            <h3 className="md:hidden font-medium text-3xl mb-7">General Details</h3>
            <div className="text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>1 sectional sofa</p>
                <p className="mt-0 md:mt-3">TFCBLIGRBL6SRHS</p>
                <p>Solid Wood</p>
                <p>L-shaped</p>
                <p>Fabric + Cotton</p>
                <p>Bright Grey & Lion</p>
              </div>
            </div>
            <div className="mt-14 md:mt-[159px]">
            <h3 className="md:hidden font-medium text-3xl mb-7">Product Details</h3>
              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>Foam</p>
                <p>Bright Grey & Lion</p>
                <p>No</p>
                <p>280 KG</p>
                <p className="mt-0 md:mt-7">India</p>
              </div>
            </div>
            <div className="mt-14 md:mt-[159px]">
            <h3 className="md:hidden font-medium text-3xl mb-7">Dimensions</h3>
              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>265.32 cm</p>
                <p>76 cm</p>
                <p>167.76 cm</p>
                <p>45 KG</p>
                <p>41.52 cm</p>
                <p>5.46 cm</p>
              </div>
            </div>

            <div className="mt-14 md:mt-[160px]">
            <h3 className="md:hidden font-medium text-3xl mb-7">Warranty Details</h3>

              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>
                  1 Year Manufacturing  
                  <br />
                  Warranty
                </p>
                <p>
                  For Warranty Claims or Any Product Related Issues Please Email
                  at operations@trevifurniture.com
                </p>
                <p>Warranty Against Manufacturing Defect</p>
                <p className="mt-0 md:mt-14">
                  The Warranty Does Not Cover Damages Due To Usage Of The
                  Product Beyond Its Intended Use And Wear & Tear In The Natural
                  Course Of Product Usage.
                </p>
                <p className="mt-0 md:mt-2 xl:mt-0">1 Year</p>
              </div>
              <button className="bg-[#B88E2F] text-white px-12 py-4 mt-10">
                Add To Cart
              </button>
            </div>
          </div>
          <div className="bg-[#E8E8E8] w-[1px] mx-8"></div>

          <div className="min-w-[150px] overflow-hidden">
            <div className="flex flex-col justify-between mt-24">
            <h3 className="md:hidden font-medium text-3xl mb-7">General Details</h3>
              <div className="text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>1 Three Seater, 2 Single Seater</p>
                <p>DTUBLIGRBL568</p>
                <p>Solid Wood</p>
                <p>L-shaped</p>
                <p>Fabric + Cotton</p>
                <p>Bright Grey & Lion</p>
              </div>
            </div>
            <div className="mt-14 md:mt-[155px]">
            <h3 className="md:hidden font-medium text-3xl mb-7">Product Details</h3>
              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>Matte</p>
                <p>Bright Grey & Lion</p>
                <p>yes</p>
                <p>300 KG</p>
                <p className="mt-7">India</p>
              </div>
            </div>
            <div className="mt-14 md:mt-[159px]">
            <h3 className="md:hidden font-medium text-3xl mb-7">Dimensions</h3>

              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>265.32 cm</p>
                <p>76 cm</p>
                <p>167.76 cm</p>
                <p>45 KG</p>
                <p>41.52 cm</p>
                <p>5.46 cm</p>
              </div>
            </div>
            <div className="mt-14 md:mt-[150px]">
            <h3 className="md:hidden font-medium text-3xl mb-7">Warranty Details</h3>

              <div className="font-normal text-xl flex flex-col gap-5 md:gap-10 lg:gap-8">
                <p>1.2 Year Manufacturing Warranty</p>
                <p>
                  For Warranty Claims or Any Product Related Issues Please Email
                  at support@xyz.com
                </p>
                <p className="mt-0 md:mt-5">
                  Warranty of the product is limited to manufacturing defects
                  only.
                </p>
                <p className="mt-0 md:mt-8 xl:mt-14">
                  The Warranty Does Not Cover Damages Due To Usage Of The
                  Product Beyond Its Intended Use And Wear & Tear In The Natural
                  Course Of Product Usage.
                </p>
                <p>3 Months</p>
              </div>
              <button className="bg-[#B88E2F] text-white px-12 py-4 mt-12">
                Add To Cart
              </button>
            </div>
          </div>
          <div className="bg-[#E8E8E8] w-[1px] ml-8 mr-0 lg:mr-[200px]"></div>
        </div>
      </div>
      <Guarantees />
    </>
  );
}
