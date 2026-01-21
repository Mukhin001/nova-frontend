"use client";

import Counter from "@/components/ui/counter/Counter";
import Device from "@/components/ui/device/Device";
import ToggleTheme from "@/components/ui/toggleTheme/ToggleTheme";
import Weather from "@/components/ui/weather/Weather";

export default function HomePage() {
  return (
    <main>
      <h1>Добро пожаловать в Full-stack App</h1>
      <ToggleTheme />
      <Counter></Counter>
      <Device />
      <Weather />
    </main>
  );
}
