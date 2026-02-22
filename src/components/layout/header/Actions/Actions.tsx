"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import AuthControls from "./AuthControls";
import MenuDrawer from "./MenuDrawer";
import { selectIsLoggedIn } from "@/store/slices/userSlice";

const Actions = () => {
  const userIsLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <AuthControls openModal={openModal} />
      {isModalOpen && (
        <MenuDrawer userIsLoggedIn={userIsLoggedIn} closeModal={closeModal} />
      )}
    </>
  );
};

export default Actions;
