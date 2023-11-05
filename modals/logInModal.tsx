"use client";

import { Box, Button, TextField } from "@mui/material";
import React from "react";

import ModalTitleRow from "@/components/modalTitleRow";
import ModalBase from "@/modals/modalBase/modalBase";
import { ModalKeys } from "@/modals/modalKeys";

const LogInModal = () => {
  return (
    <ModalBase modalKey={ModalKeys.LOGIN}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingX: 3,
          paddingY: 4
        }}
      >
        <ModalTitleRow title={"Увійти до акаунта"} modalId={ModalKeys.LOGIN} />
        <Box component="form" onSubmit={() => console.log("hello world")} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Логін або електронна пошта"
            name="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            color={"primary"}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Увійти
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default LogInModal;
