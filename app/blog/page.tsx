import Image from "next/image";
import Banner from "../components/Banner";
import blog_0 from "@/public/blog-0.jpg";
import blog_1 from "@/public/blog-1.jpg";
import blog_2 from "@/public/blog-2.jpg";
import admin from "@/public/admin_icon.svg";
import date from "@/public/date_icon.svg";
import tag from "@/public/tag_icon.svg";
import post0 from "@/public/post0.png";
import post1 from "@/public/post1.png";
import post2 from "@/public/post2.png";
import post3 from "@/public/post3.png";
import post4 from "@/public/post4.png";
import search_icon from "@/public/search-icon.png";
import Guarantees from "../components/Guarantees";

export default function Blog() {
  return (
    <>
      <Banner pageName="Blog" showLogo={true} />
      <div className="flex flex-col md:flex-row gap-8 justify-center px-6 md:px-0">
      {/* Blogs Div */}
      <div className="w-full md:w-[70%] flex flex-col pt-24 pl-0 md:pl-24">
        {/* First Blog */}
        <div className="flex flex-col">
          <Image src={blog_0} alt="" className="rounded-[10px] transform transition-transform duration-300 hover:scale-105" />
          {/* Blog Info */} 
          <div className="flex items-center gap-9 font-normal text-base text-[#9F9F9F] py-4">
            <div className="flex justify-center items-center gap-2">
              <Image src={admin} alt="" />
              <span>Admin</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={date} alt="" />
              <span>14 Oct 2022</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={tag} alt="" />
              <span>Wood</span>
            </div>
          </div>
          <h3 className="font-medium text-3xl pb-3">
            Going all-in with millennial design
          </h3>
          <p className="text-base text-[#9F9F9F] font-normal pb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </p>

          <div className="inline-block">
            <button className="text-base font-normal transition-all duration-300 hover:scale-105">
              Read more
              <span className="block mt-3 w-full h-[1px] bg-black"></span>
            </button>
          </div>
        </div>

        {/* Second Blog */}
        <div className="flex flex-col mt-14">
          <Image src={blog_1} alt="" className="rounded-[10px] transform transition-transform duration-300 hover:scale-105" />
          {/* Blog Info */}
          <div className="flex items-center gap-9 font-normal text-base text-[#9F9F9F] py-4">
            <div className="flex justify-center items-center gap-2">
              <Image src={admin} alt="" />
              <span>Admin</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={date} alt="" />
              <span>14 Oct 2022</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={tag} alt="" />
              <span>Handmade</span>
            </div>
          </div>
          <h3 className="font-medium text-3xl pb-3">
            Exploring new ways of decorating
          </h3>
          <p className="text-base text-[#9F9F9F] font-normal pb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </p>
          <div className="inline-block">
            <button className="text-base font-normal transition-all duration-300 hover:scale-105">
              Read more
              <span className="block w-full h-[1px] mt-3 bg-black"></span>
            </button>
          </div>
        </div>
        {/* Third Blog */}

        <div className="flex flex-col mt-14">
          <Image src={blog_2} alt="" className="rounded-[10px] transform transition-transform duration-300 hover:scale-105" />
          {/* Blog Info */}
          <div className="flex items-center gap-9 font-normal text-base text-[#9F9F9F] py-4">
            <div className="flex justify-center items-center gap-2">
              <Image src={admin} alt="" />
              <span>Admin</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={date} alt="" />
              <span>14 Oct 2022</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={tag} alt="" />
              <span>Wood</span>
            </div>
          </div>
          <h3 className="font-medium text-3xl pb-3">
            Handmade pieces that took time to make
          </h3>
          <p className="text-base text-[#9F9F9F] font-normal pb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </p>

          <div className="inline-block">
            <button className="text-base font-normal transition-all duration-300 hover:scale-105">
              Read more
              <span className="block w-full mt-3 bg-black h-[1px]"></span>
            </button>
          </div>
        </div>
      </div>
      {/* Categories Sidebar - Right side */}
      <div className="w-full md:w-[30%] mr-24 flex flex-col gap-6 md:gap-10 pt-0 md:pt-[72px]">
        <div className="relative mt-6 mx-auto md:mx-10 w-full md:w-auto">
        <input
            type="text"
            className="w-full py-3 md:py-5 border border-[#9F9F9F] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Image src={search_icon} alt="search icon" className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 " />
          
        </div>

        <div className="pb-8 md:pb-16 px-6 md:px-14">
          <h3 className="text-2xl font-medium mb-8">Categories</h3>
          <div className="text-[#9F9F9F] font-normal text-base flex flex-col gap-5 md:gap-10">
            <div className="flex justify-between items-center">
              <p className="transition-colors duration-300 hover:text-black hover:font-medium">Crafts</p>
              <span>2</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="transition-colors duration-300 hover:text-black hover:font-medium">Design</p>
              <span>8</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="transition-colors duration-300 hover:text-black hover:font-medium">Handmade</p>
              <span>7</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="transition-colors duration-300 hover:text-black hover:font-medium">Interior</p>
              <span>1</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="transition-colors duration-300 hover:text-black hover:font-medium">Wood</p>
              <span>6</span>
            </div>
          </div>
        </div>
        {/* RECENT POSTS */}
        <div className="flex flex-col justify-start items-start px-6 md:px-14">
          <h3 className="text-2xl font-medium">Recent Posts</h3>
          {/* Posts */}
          <div className="flex flex-col gap-5 md:gap-10">
            <div className="flex items-center gap-3 mt-6 transition-transform duration-300 hover:scale-105 hover:opacity-90">
              <Image src={post0} alt="" className="w-20 h-20" />
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-normal">
                  Going all-in with millennial design
                </h4>
                <p className="text-xs font-normal text-[#9F9F9F]">
                  03 Aug 2022
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 transition-transform duration-300 hover:scale-105 hover:opacity-90">
              <Image src={post1} alt="" className="w-20 h-20" />

              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-normal">
                  Exploring new ways of decorating
                </h4>
                <p className="text-xs font-normal text-[#9F9F9F]">
                  03 Aug 2022
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 transition-transform duration-300 hover:scale-105 hover:opacity-90">
              <Image src={post2} alt="" className="w-20 h-20" />

              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-normal">
                  Handmade pieces that took time to make
                </h4>
                <p className="text-xs font-normal text-[#9F9F9F]">
                  03 Aug 2022
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 transition-transform duration-300 hover:scale-105 hover:opacity-90">
              <Image src={post3} alt="" className="w-20 h-20" />

              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-normal">Modern home in Milan</h4>
                <p className="text-xs font-normal text-[#9F9F9F]">
                  03 Aug 2022
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 transition-transform duration-300 hover:scale-105 hover:opacity-90">
              <Image src={post4} alt="" className="w-20 h-20" />
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-normal">
                  Colorful office redesign
                </h4>
                <p className="text-xs font-normal text-[#9F9F9F]">
                  03 Aug 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/*Paginaiton */}
      <div className="flex justify-center items-center gap-9 my-14">
        <button className="pagination bg-[#B88E2F] text-white">1</button>
        <button className="pagination">2</button>
        <button className="pagination">3</button>
        <button className="pagination">Next</button>
      </div>
      <Guarantees/>
    </>
  );
}
