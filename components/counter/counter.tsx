"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrement, increment } from "./counterSlice";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  );
};

export default Counter;
