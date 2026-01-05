"use client";

import Counter from "@/components/ui/counter/Counter";
import Weather from "@/components/ui/weather/Weather";

export default function Home() {
  return (
    <main>
      Main page
      <Counter></Counter>
      <Weather />
    </main>
  );
}
