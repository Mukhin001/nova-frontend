import { User } from "@/types/apiUser";
import { Dispatch, SetStateAction } from "react";
import { Mode } from "./ProfileClient";
import Button from "../button/Button";

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
      <Button
        onClick={() => {
          setMode("edit");
        }}
      >
        редактировать
      </Button>
      <Button onClick={() => setMode("device")}>User Agent</Button>
      <dl>
        <dt>id:</dt>
        <dd>{user?.id}</dd>

        <dt>name:</dt>
        <dd>{user?.name}</dd>

        <dt>email:</dt>
        <dd>{user?.email}</dd>

        <dt>createdAt:</dt>
        <dd>{user?.createdAt}</dd>
      </dl>
    </>
  );
};

export default ProfileView;
