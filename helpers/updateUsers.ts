import { AppEmmiter } from "@/helpers/emmiter";
import { AppEvents } from "@/types/appEvents";

export function updateUsers() {
  AppEmmiter.emit(AppEvents.REFETCH_DATA);
}
