import React from "react";
import about from "../assets/frontend_assets/about_img.png";

export default function About() {
  return (
    <div className="mx-auto container p-4 border-t border-gray-200">
      <div className="mt-5">
        <h1 className="flex items-center gap-1 justify-center font-semibold text-2xl">
          <span className="text-gray-400">ABOUT</span> US
          <hr className="h-[1.5px] w-10 text-gray-600 font-bold border-1" />
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-16 mt-15">
        <div className="w-full md:max-w-[450px]">
          <img src={about} alt="" className="w-full" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6">
          <p className="text-sm text-gray-600 font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            beatae harum ipsum impedit quos. Ea officia facere quibusdam facilis
            ex, ipsum fugit repellat dolor itaque totam, pariatur quae, quas
            mollitia. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Delectus, reprehenderit modi! Error accusantium, rerum unde possimus
            quisquam hic expedita incidunt quis nisi dolorem cumque, beatae
            distinctio nemo veritatis minima ipsa. <br /> <br /> Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Quo aliquam, eligendi
            sint et esse iure quasi voluptas assumenda soluta dolor inventore
            exercitationem quia nesciunt modi voluptates sequi dolorem
            doloremque fuga?
          </p>
          <h4 className="font-bold text-lg">Our Mission</h4>
          <p className="text-sm text-gray-600 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            maxime voluptas accusantium doloremque, nam iusto repudiandae
            aperiam qui? Tempora, quos? Fugit corporis, iste vitae architecto
            ratione voluptas dolore accusamus ab.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="flex items-center gap-1 font-bold text-xl">
          <span>
            <span className="text-gray-400">WHY</span> CHOOSE US
          </span>
          <hr className="h-[1.5px] w-10 border text-gray-700" />
        </h3>

        <div className="flex flex-col md:flex-row border border-gray-200 mt-10">
          <div className="p-8 md:p-16 border border-gray-200 flex flex-col gap-6">
            <h4 className="font-bold text-sm">Quality Assurance:</h4>
            <p className="text-sm text-gray-500 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              modi ipsam ipsum repellendus eveniet
            </p>
          </div>
          <div className="p-8 md:p-16 border border-gray-200 flex flex-col gap-6">
            <h4 className="font-bold text-sm">Convenience:</h4>
            <p className="text-sm text-gray-500 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              modi ipsam ipsum repellendus eveniet
            </p>
          </div>
          <div className="p-8 md:p-16 border border-gray-200 flex flex-col gap-6">
            <h4 className="font-bold text-sm">Exceptional Customer Service:</h4>
            <p className="text-sm text-gray-500 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              modi ipsam ipsum repellendus eveniet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
