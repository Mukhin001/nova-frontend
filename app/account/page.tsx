"use client";

import { useUpdateProfileMutation } from "@/api/api";
import { useAppDispatch } from "@/store/hooks";
import { logout, selectUser, setUser } from "@/store/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const [updateProfile] = useUpdateProfileMutation();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/"); // редирект, если не авторизован
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Все поля должны быть заполнены!");
      return;
    }

    if (!validateEmail(email)) {
      alert("Введите корректный email!");
      return;
    }

    if (password.length < 6) {
      alert("Пароль должен быть минимум 6 символов!");
      return;
    }

    try {
      const data = await updateProfile({
        name,
        email,
        password,
        password_new: passwordNew,
      }).unwrap();
      console.log(user);
      // setName(data.user.id);
      // setEmail(data.user.email);
      setShowEdit(false);
      setPassword("");
      setPasswordNew("");
      dispatch(
        setUser({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            createdAt: data.user.createdAt,
          },
          token: data.token,
          isLoggedIn: true,
        })
      );
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { error?: string };
      };
      alert("❌ " + error.data?.error || "Ошибка обновления");
    }
  };

  const showForm = (): ReactNode => {
    return (
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Введите текущий пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="password_new"></label>
        <input
          type="password"
          id="password_new"
          name="password_new"
          placeholder="Введите новый пароль"
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <button type="submit">Сохранить</button>
        <button
          type="reset"
          onClick={() => {
            setName("");
            setEmail("");
            setPassword("");
            setPasswordNew("");
          }}
        >
          Сбросить
        </button>
      </form>
    );
  };

  return (
    <main>
      <h3>accaunt</h3>
      <button onClick={handleLogout}>Выйти</button>
      {!showEdit && (
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
      )}
      {showEdit && showForm()}
      {showEdit ? (
        <button
          onClick={() => {
            setName(user?.name);
            setEmail(user?.email);
            setShowEdit((prev) => !prev);
          }}
        >
          отменить
        </button>
      ) : (
        <button onClick={() => setShowEdit((prev) => !prev)}>
          редактировать
        </button>
      )}
    </main>
  );
};

export default Account;
