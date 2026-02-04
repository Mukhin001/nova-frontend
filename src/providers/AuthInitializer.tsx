"use client";
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useGetMeQuery } from "@/api/baseApi";
import { useAppDispatch } from "@/store/hooks";

const AuthInitializer = () => {
  const { data, isSuccess } = useGetMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
      console.log("Updated user in Redux:", data.user);
    }
  }, [isSuccess, data, dispatch]);

  return null;
};

export default AuthInitializer;
