import React from "react";
import { ModalKeys } from "@/modals/modalKeys";
import ModalBase from "@/modals/modalBase/modalBase";

const LogInModal = () => {
  return (
    <ModalBase modalKey={ModalKeys.LOGIN}>
      <h2>
        hello world
      </h2>
    </ModalBase>
  );
};

export default LogInModal;
