"use client";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Categories from "../inputs/Categories";
import categories from "../categories";
import Image from "next/image";
import Heading from "../Heading";
import Input from "../inputs/Input";
import axios from "axios";
import getCategories from "@/app/actions/getCategories";
import useEditModal from "@/app/hooks/useNewModal";

interface EditModalProps {
  event: {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: string;
    date: string;
    repeatable: boolean;
    period: string;
    createdAt: string;
  };
}

const EditModal: React.FC<EditModalProps> = ({ event }) => {
  const router = useRouter();
  const editModal = useEditModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(event.category);

  const selectedCat = getCategories(selectedValue);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      date: null,
      title: "",
      description: "",
      repeatable: false,
      frequency: null,
      period: "Days",
    },
  });

  const category = watch("category");
  const period = watch("period");
  const repeatable = watch("repeatable");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleCategorySelect = (value: any) => {
    setCustomValue("category", value);
    setSelectedValue(value);
  };

  const handleOnClose = () => {
    router.refresh();
    reset();
    editModal.onClose;
  };

  // get multiple dates for repeated events
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // setIsRepeatable(false);

    axios
      .post("api/events", data)
      .then(() => {
        toast.success("Event created!");
        router.refresh();
        reset();
        editModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-2" key={event.id}>
      <Heading title="New Event" subtitle="Create a new event" />
      <div className="flex flex-cols justify-center items-center height-[400px]">
        {selectedCat ? (
          <Image
            src={selectedCat.image}
            alt={selectedCat.label}
            height="200"
            width="300"
          />
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Categories categories={categories} onSelect={handleCategorySelect} />
        <Input
          label="Date: "
          id="date"
          type="date"
          register={register}
          errors={errors}
          placeholder={event.date}
          required
        />
      </div>
      <Input
        label="Title "
        id="title"
        type="text"
        register={register}
        errors={errors}
        placeholder={event.title}
        required
      />
      <Input
        label="Description: "
        id="description"
        type="description"
        register={register}
        errors={errors}
        placeholder={event.description}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Edit Event"
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
    />
  );
};

export default EditModal;
