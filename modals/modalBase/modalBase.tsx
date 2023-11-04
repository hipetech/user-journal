"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { ModalKeys } from "@/modals/modalKeys";
import { modalEmitter } from "@/modals/modalBase/modalEmitter";

interface ModalBaseProps {
  children: ReactNode | ReactNode[]
  modalKey: ModalKeys;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalBase: React.FC<ModalBaseProps> = ({children, modalKey}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  
  const closeModal = useCallback(() => setIsOpened(false), []);
  
  useEffect(() => {
    modalEmitter.on(modalKey, () => setIsOpened(true));
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
