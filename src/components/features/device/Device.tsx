"use client";

import { useGetDeviceQuery } from "@/api/device/deviceApi";
import Loader from "@/components/ui/loader/Loader";
import { Dispatch, SetStateAction } from "react";
import { Mode } from "../user/ProfileClient";
import Button from "@/components/ui/button/Button";

interface DeviceProps {
  setMode: Dispatch<SetStateAction<Mode>>;
}

const Device = ({ setMode }: DeviceProps) => {
  const { data, isLoading, isError } = useGetDeviceQuery();

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <>
        <Button onClick={() => setMode("view")}>Вернуться к профилю</Button>
        <p>Ошибка данных об устройстве</p>;
      </>
    );

  return (
    <>
      <h2>Данные устройства</h2>

      <dl className="description-list">
        <div>
          <dt>Браузер</dt>
          <dd>{data?.client.browser}</dd>
        </div>

        <div>
          <dt>ОС</dt>
          <dd>{data?.client.os}</dd>
        </div>

        <div>
          <dt>Платформа</dt>
          <dd>{data?.client.platform}</dd>
        </div>
      </dl>

      <h3>Устройство</h3>

      <dl className="description-list">
        <div>
          <dt>Тип</dt>
          <dd>{data?.device.type}</dd>
        </div>

        <div>
          <dt>Touch</dt>
          <dd>{String(data?.device.isTouch)}</dd>
        </div>
      </dl>

      <h3>Источник</h3>
      <p>{data?.source}</p>

      <Button onClick={() => setMode("view")}>Вернуться к профилю</Button>
    </>
  );
};

export default Device;
