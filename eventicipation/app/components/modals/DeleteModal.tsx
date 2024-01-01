"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import deleteEvent from "@/app/actions/deleteEvent";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  id: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
  const deleteModal = useDeleteModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading
        title="Delete Event"
        subtitle="Are you sure you want to delete this event?"
      />
    </div>
  );

  const onSubmit = () => {
    setIsLoading(true);
    deleteEvent(id)
      .then(() => {
        toast.success("Event deleted!");
        router.refresh();
        deleteModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      disabled={isLoading}
      title="Delete Event"
      isOpen={deleteModal.isOpen}
      onClose={deleteModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default DeleteModal;
