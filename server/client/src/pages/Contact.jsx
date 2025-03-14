import React from "react";
import contact from "../assets/frontend_assets/contact_img.png";

export default function Contact() {
  return (
    <div className="mx-auto container p-4 border-t border-gray-200">
      <div className="mt-5">
        <h1 className="flex items-center gap-1 justify-center font-semibold text-2xl">
          <span className="text-gray-400">CONTACT</span> US
          <hr className="h-[1.5px] w-10 text-gray-600 font-bold border-1" />
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row md:gap-10 mt-15 md:max-w-4xl mx-auto">
        <div className="w-full md:max-w-[450px]">
          <img src={contact} alt="" className="w-full" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 mt-10">
          <h4 className="font-bold text-lg">Our Store</h4>
          <p className="text-sm text-gray-600 font-semibold">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            Tel: (415) 555-0132 <br /> Email: admin@forever.com
          </p>
          <h4 className="font-bold text-xl">Careers at Forever</h4>
          <p className="text-sm text-gray-600 font-semibold">
            Learn more about our teams and job openings.
          </p>
          <button className="bg-white text-black px-8 py-4 hover:text-white hover:bg-black border text-sm font-semibold transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
