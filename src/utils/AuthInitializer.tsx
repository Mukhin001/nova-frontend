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
          user: data.user,
          isLoggedIn: true,
        })
      );
    }
    console.log(data);
    console.log(isSuccess);
  }, [isSuccess, data, dispatch]);

  return null;
};

export default AuthInitializer;
