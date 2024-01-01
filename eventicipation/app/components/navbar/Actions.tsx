"use client";
import React, { useCallback } from "react";
import Button from "../buttons/Button";
// import getCurrentUser from "@/app/actions/getCurrentUser";
import useNewModal from "@/app/hooks/useNewModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ActionsProps {
  disabled?: boolean;
}

const Actions: React.FC<ActionsProps> = ({ disabled }) => {
  //const currentUser = getCurrentUser();
  const newModal = useNewModal();
  const loginModal = useLoginModal();

  const onAdd = useCallback(() => {
    // if (!currentUser) {
    //   return loginModal.onOpen();
    // }
    return newModal.onOpen();
  }, [newModal, loginModal]);

  return (
    <>
      <Button type="add" onClick={onAdd} />
      <Button type="edit" onClick={() => {}} />
    </>
  );
};

export default Actions;
