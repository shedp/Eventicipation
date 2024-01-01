"use client";
import { Toaster } from "react-hot-toast";
import React from "react";

const ToasterProvider = (props: any) => {
  return <Toaster />;
};

export default ToasterProvider;

// providers:
// toaster is a foreign library = not adjusted to nextjs app routers
// need to wrap it around a client parent
