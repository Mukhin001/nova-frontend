"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrement, increment } from "./counterSlice";
import Button from "../button/Button";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h3>Count: {count}</h3>
      <Button onClick={() => dispatch(decrement())}>decrement</Button>
      <Button onClick={() => dispatch(increment())}>increment</Button>
    </div>
  );
};

export default Counter;
