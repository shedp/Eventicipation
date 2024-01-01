"use client";
import React, { useCallback } from "react";
import Button from "../buttons/Button";
import useNewModal from "@/app/hooks/useNewModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import useShowOptions from "@/app/hooks/showOptions";

interface ActionsProps {
  currentUser?: SafeUser | null;
}

const Actions: React.FC<ActionsProps> = ({ currentUser }) => {
  const newModal = useNewModal();
  const loginModal = useLoginModal();
  const deleteModal = useDeleteModal();
  const showOptions = useShowOptions();

  const onAdd = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return newModal.onOpen();
  }, [newModal, loginModal]);

  const onEdit = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return showOptions.onOpen();
  }, [showOptions, loginModal]);

  const onClose = useCallback(() => {
    showOptions.onClose();
  }, [showOptions]);

  return (
    <>
      <Button type="add" onClick={onAdd} />
      {showOptions.isOpen ? (
        <Button type="close" onClick={onClose} />
      ) : (
        <Button type="edit" onClick={onEdit} />
      )}
    </>
  );
};

export default Actions;
