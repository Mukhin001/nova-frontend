import { User } from "@/types/apiUser";

interface ProfileViewProps {
  user: User | null;
}

const ProfileView = ({ user }: ProfileViewProps) => {
  if (!user) {
    return <p>Войдите в профиль</p>;
  }

  return (
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
  );
};

export default ProfileView;
