"use client";

import Counter from "@/components/ui/counter/Counter";
import Device from "@/components/ui/device/Device";
import ToggleTheme from "@/components/ui/toggleTheme/ToggleTheme";
import Weather from "@/components/ui/weather/Weather";

export default function Home() {
  return (
    <main>
      Main page
      <ToggleTheme />
      <Counter></Counter>
      <Device />
      <Weather />
    </main>
  );
}
