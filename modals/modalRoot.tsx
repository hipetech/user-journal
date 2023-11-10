import React from "react";

import AddUserModal from "@/modals/addUserModal";
import LogInModal from "@/modals/logInModal";
import LogoutModal from "@/modals/logoutModal";
import LogsModal from "@/modals/logsModal";

const ModalRoot = () => {
  return (
    <>
      <LogInModal />
      <LogoutModal />
      <LogsModal />
      <AddUserModal />
    </>
  );
};

export default ModalRoot;
