"use client";
import { SafeUser } from "@/app/types";
import Button from "../buttons/Button";
import React from "react";
import useDeleteModal from "@/app/hooks/useDeleteModal";

interface CardOptionsProps {
  id: string;
}

const CardOptions: React.FC<CardOptionsProps> = ({ id }) => {
  const deleteModal = useDeleteModal();

  const onDelete = () => {
    deleteModal.onOpen();
  };

  return (
    <div className="flex place-content-around p-2">
      <Button type="edit" />
      <Button type="delete" onClick={onDelete} id={id} />
    </div>
  );
};

export default CardOptions;
