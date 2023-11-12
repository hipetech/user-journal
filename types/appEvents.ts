import { ModalKeys } from "@/modals/modalKeys";

enum Events {
  SNACKBAR = "SNACKBAR",
  REFETCH_DATA = "REFETCH_DATA"
}

export const AppEvents =  {
  ModalKeys,
  ...Events
};

export type AppEvents = typeof AppEvents;
