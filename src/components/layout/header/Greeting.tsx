"use client";

import { ReactNode } from "react";
import { useGetGreetingServerQuery } from "@/api/baseApi";
import Loader from "@/components/ui/loader/Loader";
import st from "./header.module.css";

const Greeting = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();

  const greet = (): ReactNode => {
    if (isLoading) return <Loader variant="local" />;
    if (isError) return <h2>Ошибка загрузки</h2>;
    if (data) return <h2>{data.message}</h2>;

    return null;
  };
  return <div className={`${st.greeting} ${st.isMobile}`}>{greet()}</div>;
};

export default Greeting;
