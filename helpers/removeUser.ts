import { checkPermissions } from "@/helpers/checkPermissions";
import { openSnackbar } from "@/helpers/openSnackbar";
import { updateUsers } from "@/helpers/updateUsers";
import { SnackbarKeys } from "@/snackbars/snackbarKeys";
import { useUserStore } from "@/store/userStore";
import { Permission } from "@/types/permission";
import { RemoveUser } from "@/types/removeUser";

export function removeUser(id: string) {
  const user = useUserStore.getState().user;
  
  if (user) {
    if (checkPermissions(Permission.WRITE, user)) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "DELETE",
        body: JSON.stringify({
          user: user,
          removeUserId: id
        } as RemoveUser)
      }).then(() => {
        openSnackbar(SnackbarKeys.REMOVE_USER);
        updateUsers();
      });
    } else openSnackbar(SnackbarKeys.NO_PERMISSIONS);
  }
}
