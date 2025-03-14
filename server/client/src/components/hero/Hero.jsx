import React from "react";
import hero_img from "../../assets/frontend_assets/hero_img.png";

export default function Hero() {
  return (
    <div className="">
      <div className="w-full flex flex-col md:flex-row border border-gray-400">
        {/* left */}

        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-4 py-8">
            <span className="flex items-center gap-1">
              <hr className="h-[2.0px] w-6 md:w-10 bg-gray-700" />
              <p className="font-semibold text-gray-800 text-sm md:textlg">
                OUR BESTSELLERS
              </p>
            </span>

            <h2 className="text-2xl font-bold md:text-4xl text-gray-700">
              LATEST ARRIVALS
            </h2>

            <span className="flex items-center gap-1">
              <p className="font-bold text-gray-800 text-sm md:text-lg">
                SHOP NOW
              </p>
              <hr className="h-[1.0px] w-6 md:w-10 bg-gray-700" />
            </span>
          </div>
        </div>

        {/* right */}
        <div className="w-full md:w-1/2">
          <img className="w-full" src={hero_img} alt="" />
        </div>
      </div>
    </div>
  );
}
