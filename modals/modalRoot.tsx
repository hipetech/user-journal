import React from "react";

import LogInModal from "@/modals/logInModal";
import LogoutModal from "@/modals/logoutModal";
import LogsModal from "@/modals/logsModal";

const ModalRoot = () => {
  return (
    <>
      <LogInModal />
      <LogoutModal />
      <LogsModal />
    </>
  );
};

export default ModalRoot;
