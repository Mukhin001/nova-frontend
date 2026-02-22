"use client";

import { ReactNode } from "react";
import { useGetGreetingServerQuery } from "@/api/baseApi";
import Loader from "@/components/ui/loader/Loader";
import st from "./serverStatus.module.css";

type ServerStatusClass = "showAlways" | "isMobile";

interface ServerStatusProps {
  className: ServerStatusClass;
}

const ServerStatus = ({ className }: ServerStatusProps) => {
  const { data, isLoading, isError } = useGetGreetingServerQuery();

  const renderStatus = (): ReactNode => {
    if (isLoading)
      return <Loader variant="local" description="Связываемся с сервером" />;
    if (isError) return <span>Сервер не доступен</span>;
    if (data) return <span>{data.message}</span>;

    return null;
  };
  return <div className={st[className]}>{renderStatus()}</div>;
};

export default ServerStatus;
