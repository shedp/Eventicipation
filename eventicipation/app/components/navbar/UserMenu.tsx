"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import React, { useCallback, useState } from "react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setMenuOpen((value) => !value);
  }, [setMenuOpen, menuOpen]);

  return (
    <div className="flex flex-col items-center">
      {currentUser ? (
        <>
          <div
            onClick={toggleOpen}
            className="cursor-pointer border-b b-6 border-transparent hover:border-yellow-500 pb-3 w-full text-center"
          >{`Hello, ${currentUser.name?.split(" ")[0]}`}</div>
          {menuOpen && (
            <div
              className={`absolute z-30 shadow-lg transition bg-white relative rounded-b-xl`}
            >
              <div
                className="px-6 py-3 w-full text-center cursor-pointer border-b b-6 border-transparent hover:text-semi-bold hover:border-yellow-500 hover:bg-gray-100"
                onClick={() => signOut()}
              >
                Log Out
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            onClick={toggleOpen}
            className="cursor-pointer border-b b-6 border-transparent hover:border-yellow-500 pb-3 w-full text-center"
          >
            Hello, stranger
          </div>
          {menuOpen && (
            <div
              className={`absolute z-30 shadow-lg transition bg-white relative rounded-b-xl`}
            >
              <div
                className="px-6 py-3 w-full text-center cursor-pointer border-b b-6 border-transparent hover:text-semi-bold hover:border-yellow-500 hover:bg-gray-100"
                onClick={loginModal.onOpen}
              >
                Log In
              </div>
              <div
                className="px-6 py-3 w-full text-center cursor-pointer border-b b-6 border-transparent hover:text-semi-bold hover:border-yellow-500 hover:bg-gray-100"
                onClick={registerModal.onOpen}
              >
                Register
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserMenu;
