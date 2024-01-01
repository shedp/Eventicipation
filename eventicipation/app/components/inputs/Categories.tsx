"use client";
import React, { useState } from "react";

interface Category {
  label: string;
  image: string;
  description: string;
}

interface CategoriesInterface {
  selectedCategory?: string;
  onSelect: (value: string) => void;
  categories: Category[];
}

const Categories: React.FC<CategoriesInterface> = ({
  onSelect,
  categories,
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onSelect(value); // Pass the selected value to the parent component
  };

  return (
    <div className={`py-2 w-full relative gap-1 flex flex-col`}>
      <label className="block px-5" htmlFor="category">
        Category
      </label>
      <div className="">
        <select
          className={`mt-[6px] ml-5 absolute peer w-10/12 font-light transition disabled:opacity-70 disabled:cursor-not-allowed rounded-full outline-none`}
          id="category"
          name="category"
          onChange={handleSelect}
        >
          {categories.map((item) => {
            return (
              <option value={item.label} key={item.label}>
                {item.label}
              </option>
            );
          })}
        </select>
        <div
          className={` peer w-full h-[42px] font-light transition border-2 border-gray-300 rounded-full px-5 py-1 outline-none`}
        ></div>
      </div>
    </div>
  );
};

export default Categories;
