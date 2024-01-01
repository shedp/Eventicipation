"use client";
import React, { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Signed in");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [LoginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log into your account" />
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
          Don't have an account?
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Sign-Up"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
