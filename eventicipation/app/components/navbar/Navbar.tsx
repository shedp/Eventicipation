"use client";
import React, { useCallback, useState } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Actions from "./Actions";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <Container>
      <header className="grid grid-cols-3 justify-between align-center z-40">
        <div className="mx-4 my-1 min-w-10">
          <Logo />
        </div>
        <div className="m-4 min-w-10 flex justify-center relative">
          <UserMenu currentUser={currentUser} />
        </div>
        <div className="flex justify-end min-w-10 mr-4">
          <Actions />
        </div>
      </header>
    </Container>
  );
};

export default Navbar;
