import { showToast } from "../toast/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { User } from "@/types/apiUser";
import { useRouter } from "next/navigation";

interface ProfileViewProps {
  user: User | null;
}

const ProfileView = ({ user }: ProfileViewProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!user) {
    dispatch(showToast({ message: "Войдите в систему" }));
    router.push("/login");
    return null;
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
