"use client";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useGetMeQuery } from "@/api/baseApi";

const AuthInitializer = () => {
  const { data, isSuccess } = useGetMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
        })
      );
    }
    console.log(data);
    console.log(isSuccess);
  }, [isSuccess, data, dispatch]);

  return null;
};

export default AuthInitializer;
