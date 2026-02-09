"use client";
import { useAppSelector } from "@/store/hooks";
import UserHome from "./UserHome";
import GuestHome from "./GuestHome";

const HomeClient = () => {
  const user = useAppSelector((state) => state.user.user);

  return user ? <UserHome user={user} /> : <GuestHome />;
};

export default HomeClient;
