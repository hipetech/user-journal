"use client";

import { Button } from "@mui/material";
import React from "react";

import { toggleModal } from "@/helpers/toggleModal";
import { ModalKeys } from "@/modals/modalKeys";

const HeaderButtons = async () => {
  
  return (
    <nav>
      <Button color="inherit">Додати користувача</Button>
      <Button color="inherit">Логи</Button>
      <Button color="inherit" onClick={() => toggleModal(ModalKeys.LOGIN)}>Увійти</Button>
    </nav>
  );
};

export default HeaderButtons;
