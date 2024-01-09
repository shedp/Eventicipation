"use client";
import Button from "../buttons/Button";
import React from "react";
// import useDeleteModal from "@/app/hooks/useDeleteModal";
import useEditModal from "@/app/hooks/useEditModal";
import deleteEvent from "@/app/actions/deleteEvent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CardOptionsProps {
  id: string;
}

const CardOptions: React.FC<CardOptionsProps> = ({ id }) => {
  // const deleteModal = useDeleteModal();
  const editModal = useEditModal();
  // const router = useRouter();

  const onDelete = async (deleteId: string) => {
    try {
      // deleteModal.onOpen();
      await deleteEvent(deleteId);
      toast.success("Event deleted!");
      // router.refresh();
      // deleteModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onEdit = () => {
    editModal.onOpen();
  };

  return (
    <div className="flex place-content-around p-2">
      <Button type="edit" onClick={onEdit} />
      <Button type="delete" onClick={() => onDelete(id)} />
    </div>
  );
};

export default CardOptions;
