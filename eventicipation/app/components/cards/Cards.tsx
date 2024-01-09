"use client";
import getCategories from "@/app/actions/getCategories";
import Image from "next/image";
import React from "react";
import Button from "../buttons/Button";
import { SafeUser } from "@/app/types";
import CardOptions from "./CardOptions";
import useShowOptions from "@/app/hooks/showOptions";

interface CardProps {
  id: string;
  key: string;
  title: string;
  days: number;
  category: string;
  description?: string;
  userId?: string;
  currentUser: SafeUser | null;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  days,
  category,
  description,
  userId,
  currentUser,
}) => {
  const image = getCategories(category)?.image || "";
  const showOptions = useShowOptions();

  return (
    <div>
      <div
        className="card grid grid-row-4 gap-3 items-center justify-center text-center w-max-80 p-8 h-auto"
        key={id}
      >
        <div className="h-min-[9rem] sm:h-[20rem] md:h-[15rem] lg:h-[13rem] xl:h-[13rem] overflow-hidden">
          <Image
            src={image}
            alt={category}
            height={400}
            width={400}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex items-center justify-center h-[5rem]">
          <h3>{title}</h3>
        </div>
        <div className="flex items-center justify-center h-[3rem] text-gray-400 text-sm">
          <p>{description}</p>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-bold">{days}</h1>
          <p>Days</p>
        </div>
      </div>
      <div className="h-[4rem]">
        {currentUser?.id == userId && showOptions.isOpen ? (
          <CardOptions id={id} key={id} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
