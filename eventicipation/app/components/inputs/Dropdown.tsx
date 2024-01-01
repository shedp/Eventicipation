"use client";
import React, { useState } from "react";

interface DropdownInterface {
  onSelect: (value: any) => void;
  options: string[];
  name: string;
}

const Dropdown: React.FC<DropdownInterface> = ({ onSelect, options, name }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onSelect(value);
  };

  return (
    <div className={`py-2 w-full relative gap-1 flex flex-col`}>
      <label className="block px-5" htmlFor={name}>
        Category
      </label>
      <div>
        <select
          className={`mt-[6px] ml-5 absolute peer w-10/12 font-light transition disabled:opacity-70 disabled:cursor-not-allowed rounded-full outline-none`}
          id={name}
          name={name}
          onChange={handleSelect}
        >
          {options.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div
          className={`peer w-full h-[42px] font-light transition border-2 border-gray-300 rounded-full px-5 py-1 outline-none`}
        ></div>
      </div>
    </div>
  );
};

export default Dropdown;
