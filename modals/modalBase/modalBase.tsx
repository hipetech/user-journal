"use client";

import { Box, Modal } from "@mui/material";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

import { modalEmitter } from "@/modals/modalBase/modalEmitter";
import { ModalKeys } from "@/modals/modalKeys";

interface ModalBaseProps {
  children: ReactNode | ReactNode[]
  modalKey: ModalKeys;
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

const ModalBase: React.FC<ModalBaseProps> = ({children, modalKey}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  
  const closeModal = useCallback(() => setIsOpened(false), []);
  
  useEffect(() => {
    modalEmitter.on(modalKey, () => setIsOpened(value => !value));
    return () => {
      modalEmitter.off(modalKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Modal open={isOpened} onClose={closeModal}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalBase;
