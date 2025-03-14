import React from "react";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <div className="mt-auto px-3 ">
      <div className="flex flex-col md:flex-row gap-14 md:gap-8 justify-between w-full mt-20 border-t border-gray-200 pt-10">
        <div className="flex flex-col md:w-2/3  gap-3">
          <h1 className="font-bold text-2xl">FOREVER</h1>
          <p className="text-gray-500 md:w-2/3 text-sm md:text-balance md:leading-relaxed md:hyphens-auto pr-20 md:pr-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">COMPANY</h1>
            <ul className="text-sm flex flex-col gap-3">
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">GET IN TOUCH</h1>
            <div className="text-sm flex flex-col gap-3">
              <p>+1-000-000-0000</p>
              <p>ks.orji@gmail.com</p>
              <a href="https://github.com/sarmy07">Github</a>
              <a href="https://github.com/sarmy07">Github</a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 mt-10">
        <span className="text-sm text-gray-700 font-semibold flex justify-center p-4">
          Copyright 2024@ sarmy.dev - All Right Reserved.
        </span>
      </div>
    </div>
  );
}
