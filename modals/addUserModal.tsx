"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";

import ModalTitleRow from "@/components/modalTitleRow";
import ModalBase from "@/modals/modalBase";
import { ModalKeys } from "@/modals/modalKeys";

const AddUserModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <ModalBase modalKey={ModalKeys.ADD_USER} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box component={"form"} sx={{
        width: 600,
        height: 500,
      }}>
        <ModalTitleRow title={"Додати користувача"} modalId={ModalKeys.ADD_USER} />
        <Box>
        
        </Box>
      </Box>
    </ModalBase>
  );
};

export default AddUserModal;
