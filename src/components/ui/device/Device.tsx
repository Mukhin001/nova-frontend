"use client";

import { useGetDeviceQuery } from "@/api/device/deviceApi";
import Loader from "../loader/Loader";
import { Dispatch, SetStateAction } from "react";
import { Mode } from "../updateProfile/ProfileClient";
import Button from "../button/Button";

interface DeviceProps {
  setMode: Dispatch<SetStateAction<Mode>>;
}

const Device = ({ setMode }: DeviceProps) => {
  const { data, isLoading, isError } = useGetDeviceQuery();

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load device</p>;

  return (
    <section>
      <Button onClick={() => setMode("view")}>Вернуться к профилю</Button>
      <h3>Client!</h3>
      <p>browser: {data?.client.browser}</p>
      <p>os: {data?.client.os}</p>
      <p>platform: {data?.client.platform}</p>
      <h3>Device!</h3>
      <p>type: {data?.device.type}</p>
      <p>isTouch: {data?.device.isTouch.toString()}</p>
      <h3>Source! {data?.source}</h3>
    </section>
  );
};

export default Device;
