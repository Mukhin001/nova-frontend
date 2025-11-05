"use client";
import Auth from "@/components/auth/auth";
import Counter from "@/components/counter/counter";

export default function Home() {
  return (
    <main>
      Main page
      <Counter></Counter>
      <Auth></Auth>
    </main>
  );
}
