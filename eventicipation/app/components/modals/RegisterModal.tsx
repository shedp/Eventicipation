"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

interface RegisterModalProps {}

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [RegisterModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Eventicipation"
        subtitle="Register to start!"
      />
      <Input
        label="Name: "
        id="name"
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Email: "
        id="email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Password: "
        id="password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <>
      <button
        onClick={() => signIn("google")}
        className={`relative py-2 rounded-full hover:opacity-80 transition w-full bg-white border-2 border-black text-black`}
      >
        <FcGoogle size={24} className="absolute left-5 top-3" />
        Continue with Google
      </button>
      <div className="text-neutral-500 text-center mt-5 font-light">
        <p>
          Already have an account?
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Sign-Up"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
