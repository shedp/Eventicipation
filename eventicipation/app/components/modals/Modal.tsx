"use client";
import React, { useCallback, useState } from "react";
import Button from "../buttons/Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative overflow-y-auto w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full overflow-y-auto ${
              !showModal
                ? `translate-y-0 opacity-100`
                : `translate-y-full opacity-0`
            }`}
          >
            <div className="translate overflow-y-auto h-full lg:h-auto mg:h-auto border-0 rounded-xl shadow-lg relative flex-col w-full bg-white focus:outline-none p-4 border-yellow-500 border-4">
              <div className="relative p-2 flex-auto text-center">{title}</div>
              <hr />
              <div className="relative p-4 flex-auto">{body}</div>
              <div className="flex justify-around">
                <Button type="close" onClick={handleClose} />
                <Button type="submit" onClick={handleSubmit} />
              </div>
              <div className="relative p-6 flex-auto">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
