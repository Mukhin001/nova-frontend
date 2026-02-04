"use client";

import { useGetDeviceQuery } from "@/api/device/deviceApi";
import Loader from "../loader/Loader";

const Device = () => {
  const { data, isLoading, isError } = useGetDeviceQuery();
  //console.log(data);
  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load device</p>;

  return (
    <section>
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
