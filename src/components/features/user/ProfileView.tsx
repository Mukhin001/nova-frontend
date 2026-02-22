import { User } from "@/types/apiUser";
import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../features/user/ProfileClient";
import Button from "@/components/ui/button/Button";

interface ProfileViewProps {
  user: User | null;
  setMode: Dispatch<SetStateAction<Mode>>;
}

const ProfileView = ({ user, setMode }: ProfileViewProps) => {
  if (!user) {
    return <p>Войдите в профиль</p>;
  }

  return (
    <>
      <h2>Данные профиля</h2>
      <dl className="description-list">
        <div>
          <dt>Имя</dt>
          <dd>{user?.name}</dd>
        </div>

        <div>
          <dt>Email</dt>
          <dd>{user?.email}</dd>
        </div>

        <div>
          <dt>Создан</dt>
          <dd>{user?.createdAt}</dd>
        </div>
      </dl>
      <Button
        onClick={() => {
          setMode("edit");
        }}
      >
        редактировать
      </Button>
      <Button onClick={() => setMode("delete")}>Удалить аккаунт</Button>
      <Button onClick={() => setMode("device")}>User Agent</Button>
    </>
  );
};

export default ProfileView;
