"use client";

import { useGetGreetingServerQuery } from "@/api/api";
import { ReactNode } from "react";

const TheHeader = () => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();

  const greet = (): ReactNode => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error...</p>;
    if (data) return <p>{data.message}</p>;

    return null;
  };

  return (
    <header>
      Header
      <div>
        <h2>Full-stack-app</h2>
        {greet()}
      </div>
    </header>
  );
};

export default TheHeader;
