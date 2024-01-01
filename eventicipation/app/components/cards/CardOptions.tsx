"use client";
import { SafeUser } from "@/app/types";
import Button from "../buttons/Button";
import React from "react";

interface CardOptionsProps {
  id: string;
  userId?: string;
  currentUser?: SafeUser;
}

const CardOptions: React.FC<CardOptionsProps> = ({ id }) => {
  const onDelete = () => {};

  return (
    <div className="flex place-content-around p-2">
      <Button type="edit" />
      <Button type="delete" />
    </div>
  );
};

export default CardOptions;
