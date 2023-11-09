import { modalEmitter } from "@/modals/modalEmitter";
import { ModalKeys } from "@/modals/modalKeys";

export function toggleModal(modalKey: ModalKeys) {
  modalEmitter.emit(modalKey);
}
