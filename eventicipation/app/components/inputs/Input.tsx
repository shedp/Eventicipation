"use client";
import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  placeholder?: any;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: () => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  disabled,
  required,
  register,
  errors,
  onChange,
}) => {
  return (
    <div className="py-2 w-full relative gap-1 flex flex-col">
      <label className="block px-5" htmlFor={id}>
        {label}
      </label>
      <input
        className={`peer w-full font-light bg-white transition border-2 border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-full px-5 py-1 outline-none ${
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-yellow-500"
        }`}
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder || " "}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
