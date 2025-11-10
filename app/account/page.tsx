"use client";

//import { useLazyGetProfileQuery } from "@/api/api";
import { useAppDispatch } from "@/store/hooks";
import { logout, selectUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  //const data = useLazyGetProfileQuery();
  console.log(user);
  //console.log(data);
  useEffect(() => {
    if (!user) {
      router.push("/"); // редирект, если не авторизован
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <main>
      <h3>accaunt</h3>
      <button onClick={handleLogout}>Выйти</button>
      <ul>
        <li>
          <h3>id:</h3> {user?.id}
        </li>
        <li>
          <h3>name:</h3> {user?.name}
        </li>
        <li>
          <h3>email: </h3>
          {user?.email}
        </li>
        <li>
          <h3>createdAt:</h3> {user?.createdAt}
        </li>
      </ul>
    </main>
  );
};

export default Account;
