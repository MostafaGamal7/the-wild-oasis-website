import React from "react";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8 md:gap-20 border border-primary-800 py-3 px-2 sm:px-6 md:px-10 mb-16 md:mb-24">
      <div className="relative -translate-y-7 md:-translate-y-0 w-full h-60 sm:h-80 md:h-auto scale-100 md:scale-[1.15] md:-translate-x-3 mb-6 md:mb-0">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${cabin.name}`}
        />
      </div>

      <div className="-mt-30 md:mt-0">
        <h3 className="text-accent-100 -translate-y-15 md:translate-y-0 inline-block max-w-fit  font-black text-2xl md:text-5xl mb-3 sm:mb-5 md:translate-x-[-254px] bg-primary-950 p-3 sm:p-6 pb-1 w-full md:w-[150%] rounded-md">
          Cabin {cabin.name}
        </h3>

        <p className="text-base sm:text-lg text-primary-300 mb-6 sm:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-7">
          <li className="flex gap-2 sm:gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
