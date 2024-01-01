"use client";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import useNewModal from "@/app/hooks/useNewModal";
import Modal from "./Modal";
import Categories from "../inputs/Categories";
import categories from "../categories";
import Image from "next/image";
import Heading from "../Heading";
import Input from "../inputs/Input";
import axios from "axios";
import getCategories from "@/app/actions/getCategories";
import getCurrentUser from "@/app/actions/getCurrentUser";

const NewModal = () => {
  const router = useRouter();
  const newModal = useNewModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isRepeatable, setIsRepeatable] = useState(false);
  const currentUser = getCurrentUser();

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

  const handleCheckboxChange = (e: any) => {
    setIsRepeatable(!isRepeatable);
    setCustomValue("repeatable", e.target.checked);
  };

  const handlePeriodSelect = (value: any) => {
    setCustomValue("period", value);
    setSelectedValue(value);
  };

  const handleOnClose = () => {
    router.refresh();
    reset();
    newModal.onClose;
  };

  // get multiple dates for repeated events
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    setIsRepeatable(false);
    console.log(data);

    axios
      .post("api/events", data)
      .then(() => {
        toast.success("Event created!");
        router.refresh();
        reset();
        newModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-2">
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
          required
        />
      </div>
      <Input
        label="Title "
        id="title"
        type="text"
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Description: "
        id="description"
        type="description"
        register={register}
        errors={errors}
        placeholder={selectedCat ? selectedCat.description : ""}
      />
      {/* 
      <Checkbox
        label="Repeatable?"
        options={["Yes"]}
        onChange={handleCheckboxChange}
      />
      <div className="block">
        <div className={isRepeatable ? `grid grid-cols-2 gap-2` : `hidden`}>
          <Input
            label="Frequency: "
            id="frequency"
            type="number"
            register={register}
            errors={errors}
          />
          <Dropdown
            onSelect={handlePeriodSelect}
            options={["Days", "Weeks", "Months", "Years"]}
            name="period"
          />
        </div>
      </div> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="New Event"
      isOpen={newModal.isOpen}
      onClose={newModal.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
    />
  );
};

export default NewModal;
