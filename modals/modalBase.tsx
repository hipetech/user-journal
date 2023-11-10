"use client";

import { Box, Modal } from "@mui/material";
import React, { ReactNode, useCallback, useEffect } from "react";

import { AppEmmiter } from "@/helpers/emmiter";
import { ModalKeys } from "@/modals/modalKeys";

interface ModalBaseProps {
  children: ReactNode | ReactNode[]
  modalKey: ModalKeys;
  isOpen: boolean;
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "4px",
};

const ModalBase: React.FC<ModalBaseProps> = ({children, modalKey, isOpen, setIsOpen}) => {
  
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  
  useEffect(() => {
    AppEmmiter.on(modalKey, () => setIsOpen(value => !value));
    return () => {
      AppEmmiter.off(modalKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalBase;
