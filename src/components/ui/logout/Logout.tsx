import { useLogoutMutation } from "@/api/users/logout/logout";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "../toast/toastSlice";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface LogoutProps {
  setopenLogout: Dispatch<SetStateAction<boolean>>;
}

const Logout = ({ setopenLogout }: LogoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logoutRequest] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      dispatch(showToast({ message: "Не удалось выйти. Попробуйте снова." }));
    } finally {
      dispatch(logout());
      dispatch(showToast({ message: "До свидания!", type: "success" }));
      setopenLogout(false);
      router.push("/");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        left: 0,
        top: "30%",
        display: "grid",
        justifyContent: "center",
        background: "#020617",
        padding: "40px ",
      }}
    >
      <h3>Выйти</h3>
      <div>
        <button onClick={() => setopenLogout(false)}>Нет</button>
        <button onClick={handleLogout}>Да</button>
      </div>
    </div>
  );
};

export default Logout;
