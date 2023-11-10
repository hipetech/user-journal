import { ModalKeys } from "@/modals/modalKeys";

enum Events {
  SNACKBAR = "SNACKBAR"
}

export const AppEvents =  {
  ModalKeys,
  ...Events
};

export type AppEvents = typeof AppEvents;
