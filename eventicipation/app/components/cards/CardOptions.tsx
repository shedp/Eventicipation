"use client";
import { SafeUser } from "@/app/types";
import Button from "../buttons/Button";
import React from "react";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import useEditModal from "@/app/hooks/useEditModal";

interface CardOptionsProps {
  id: string;
}

const CardOptions: React.FC<CardOptionsProps> = ({ id }) => {
  const deleteModal = useDeleteModal();
  const editModal = useEditModal();

  const onDelete = () => {
    deleteModal.onOpen();
  };

  const onEdit = () => {
    editModal.onOpen();
  };

  return (
    <div className="flex place-content-around p-2">
      <Button type="edit" onClick={onEdit} />
      <Button type="delete" onClick={onDelete} />
    </div>
  );
};

export default CardOptions;
