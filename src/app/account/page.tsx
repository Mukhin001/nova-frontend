"use client";

import { useDeleteMutation } from "@/api/users/delete/deleteUser";
import { useLogoutMutation } from "@/api/users/logout/logout";
import { useUpdateProfileMutation } from "@/api/users/update-profile/updateProfile";
import { useAppDispatch } from "@/store/hooks";
import { logout, selectUser, setUser } from "@/store/slices/userSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface AddLoginFormFields extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AddLoginFormElements extends HTMLFormElement {
  readonly elements: AddLoginFormFields;
}

const Account = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const [updateProfile] = useUpdateProfileMutation();
  const [deleteUser] = useDeleteMutation();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showFormDelete, setShowFormDelete] = useState<boolean>(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [emailDeleteUser, setEmailDeleteUser] = useState(user?.email || "");
  const [passwordDeleteUser, setPasswordDeleteUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [logoutRequest] = useLogoutMutation();
  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/"); // редирект, если не авторизован
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      const res = await logoutRequest().unwrap();
      console.log(res.message);

      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      alert("Не удалось выйти. Попробуйте снова.");
    }
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
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
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

  const handleDelete = async (e: React.FormEvent<AddLoginFormElements>) => {
    e.preventDefault();

    try {
      if (!user) {
        return alert("войтите в систему");
      }
      if (!emailDeleteUser || !passwordDeleteUser) {
        return alert("Введите email и пароль");
      }

      const res = await deleteUser({
        email: emailDeleteUser,
        password: passwordDeleteUser,
      }).unwrap();
      console.log(res.message);

      alert(res.message);
      setEmailDeleteUser("");
      setPasswordDeleteUser("");
      dispatch(logout());
      setShowFormDelete(false);
      router.push("/");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      const err = error as FetchBaseQueryError & {
        data?: { error?: string };
      };
      // --- 🎯 Обработка ошибок ---
      if (err.status === 404) {
        alert("❌ Пользователь с таким email не найден");
        return;
      }
      if (err.status === 401) {
        alert("❌ Неверный пароль");
        return;
      }
      alert("Не удалось удалить ваш аккаунт. Попробуйте снова.");
    }
  };

  return (
    <main>
      <h3>accaunt</h3>
      <button onClick={handleLogout}>Выйти</button>
      <button onClick={() => setShowFormDelete((prev) => !prev)}>
        {showFormDelete ? "отменить" : "удалить аккаунт"}
      </button>
      {showFormDelete && (
        <form onSubmit={handleDelete}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={emailDeleteUser}
            onChange={(e) => setEmailDeleteUser(e.target.value)}
          />

          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите текущий пароль"
            value={passwordDeleteUser}
            onChange={(e) => setPasswordDeleteUser(e.target.value)}
          />
          <button type="submit">Удалить</button>
          <button
            type="reset"
            onClick={() => {
              setEmailDeleteUser("");
              setPasswordDeleteUser("");
            }}
          >
            Сбросить
          </button>
        </form>
      )}
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
