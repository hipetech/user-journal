"use client";

import { Box, Button, DialogActions, DialogTitle } from "@mui/material";
import React, { useCallback, useState } from "react";

import { postLog } from "@/helpers/postLog";
import { toggleModal } from "@/helpers/toggleModal";
import ModalBase from "@/modals/modalBase";
import { ModalKeys } from "@/modals/modalKeys";
import { useUserStore } from "@/store/userStore";
import { LogType } from "@/types/log";

const LogoutModal = () => {
  
  const {setUser} = useUserStore();
  
  const logout = useCallback(() => {
    toggleModal(ModalKeys.LOGOUT);
    postLog(LogType.LOGOUT);
    setUser(null);
  }, [setUser]);
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <ModalBase modalKey={ModalKeys.LOGOUT} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box sx={{padding: 1}}>
        <DialogTitle>
          Ви впевнені що хочете вийти з акаунта?
        </DialogTitle>
        <DialogActions>
          <Button color={"primary"} variant={"outlined"} onClick={() => toggleModal(ModalKeys.LOGOUT)}>
            Ні
          </Button>
          <Button autoFocus variant={"contained"} onClick={logout}>
            Так
          </Button>
        </DialogActions>
      </Box>
    </ModalBase>
  );
};

export default LogoutModal;
