import { AppEmmiter } from "@/helpers/emmiter";
import { SnackbarKeys } from "@/snackbars/snackbarKeys";
import { AppEvents } from "@/types/appEvents";

export function openSnackbar(snackbarKey: SnackbarKeys) {
  AppEmmiter.emit(AppEvents.SNACKBAR, snackbarKey);
}
