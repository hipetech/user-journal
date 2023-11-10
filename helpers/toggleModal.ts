import { AppEmmiter } from "@/helpers/emmiter";
import { ModalKeys } from "@/modals/modalKeys";

export function toggleModal(modalKey: ModalKeys) {
  AppEmmiter.emit(modalKey);
}
