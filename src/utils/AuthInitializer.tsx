"use client";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "@/api/users/userApi";
import { setUser } from "@/utils/userSlice";
import { useEffect } from "react";

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
