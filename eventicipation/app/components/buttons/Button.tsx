"use client";
import React, { useState } from "react";
import {
  UilPlus,
  UilCheck,
  UilMultiply,
  UilPen,
  UilTrashAlt,
} from "@iconscout/react-unicons";

interface ButtonProps {
  type: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, onClick }) => {
  switch (type) {
    case "add":
      return (
        <div
          className="rounded-full m-2 cursor-pointer w-[3rem] h-[3rem] flex justify-center items-center bg-yellow hover:bg-yellow-400"
          onClick={onClick}
        >
          <UilPlus />
        </div>
      );
      break;
    case "submit":
      return (
        <div
          className="rounded-full m-2 cursor-pointer w-[3rem] h-[3rem] flex justify-center items-center bg-yellow hover:bg-yellow-400"
          onClick={onClick}
        >
          <UilCheck />
        </div>
      );
      break;
    case "close":
      return (
        <div
          className="bg-gray-200 rounded-full p-4 m-2 cursor-pointer hover:bg-gray-100 w-[3rem] h-[3rem] flex justify-center items-center"
          onClick={onClick}
        >
          <UilMultiply />
        </div>
      );
      break;
    case "delete":
      return (
        <div
          className="rounded-full m-2 cursor-pointer p-2 m-3 w-[3rem] h-[3rem] flex justify-center items-center bg-yellow hover:bg-yellow-400"
          onClick={onClick}
        >
          <UilTrashAlt />
        </div>
      );
      break;
    case "edit":
      return (
        <div
          className="bg-gray-200 rounded-full p-3 m-2 cursor-pointer hover:bg-gray-100 w-[3rem] h-[3rem] flex justify-center items-center"
          onClick={onClick}
        >
          <UilPen />
        </div>
      );
      break;
    default:
      return (
        <div
          className="bg-gray-200 rounded-full p-3 m-2 cursor-pointer hover:bg-gray-100 w-[3rem] h-[3rem] flex justify-center items-center"
          onClick={onClick}
        >
          <UilPen />
        </div>
      );
      break;
  }
};

export default Button;
