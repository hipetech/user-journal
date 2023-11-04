import { ModalKeys } from "@/modals/modalKeys";
import { modalEmitter } from "@/modals/modalBase/modalEmitter";

export function openModal(modalKey: ModalKeys) {
  modalEmitter.emit(modalKey);
}
