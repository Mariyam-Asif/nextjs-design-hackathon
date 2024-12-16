"use client";
import Image from "next/image";
import { useState } from "react";

export default function Inspirations() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/room-1.png", "/room-2.png", "/room-3.png", "/room-4.png"];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="container py-[44px]">
      {/* Left Side */}
      <div className="left-side">
        <h2>50+ Beautiful rooms inspiration</h2>
        <h3>
          Our designer already made a lot of beautiful prototipe of rooms that
          inspire you
        </h3>
        <button>Explore More</button>
      </div>

      {/* Right Side */}
      <div className="right-side">
          {/* Currently Viewing Image */}
<div className="image-container">
          <div className="main-image">
            <Image
              src={images[currentImageIndex]}
              alt={`Room ${currentImageIndex + 1}`}
              layout="responsive"
              width={404}
              height={582}
              className="image"
            />
          </div>
          <div className="second-image">
            <Image
              src={images[(currentImageIndex + 1) % images.length]}
              alt={`Room ${(currentImageIndex + 2) % images.length}`}
              layout="intrinsic"
              width={372}
              height={486}
              className="image"
            />
          </div>
          <div className="third-image">
            <Image
              src={images[(currentImageIndex + 2) % images.length]}
              alt={`Room ${(currentImageIndex + 3) % images.length}`}
              layout="intrinsic"
              width={372}
              height={486}
              className="image"
            />
          </div>
          </div>
        {/* Image Tracker */}
        <div className="image-tracker">
          {images.map((_, index) => (
            <div
              key={index}
              className={`tracker-circle ${
                index === currentImageIndex ? "active" : ""
              }`}
              onClick={()=>setCurrentImageIndex(index)}
            ></div>
          ))}
        </div>
        {/* Next Arrow */}
        <button className="arrow next-arrow" onClick={handleNext}></button>
      </div>
    </div>
  );
}
