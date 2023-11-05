import { modalEmitter } from "@/modals/modalBase/modalEmitter";
import { ModalKeys } from "@/modals/modalKeys";

export function toggleModal(modalKey: ModalKeys) {
  modalEmitter.emit(modalKey);
}
