"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";

import ModalTitleRow from "@/components/modalTitleRow";
import { toggleModal } from "@/helpers/toggleModal";
import ModalBase from "@/modals/modalBase";
import { ModalKeys } from "@/modals/modalKeys";
import { useUserStore } from "@/store/userStore";
import { LoginResponse } from "@/types/loginResponse";


const LogInModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const [loginError, setLoginError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [resError, setResError] = useState<boolean>(false);
  const {setUser} = useUserStore();
  
  const submit = useCallback(async () => {
    if (login.length < 2) setLoginError(true);
    if (password.length < 2) setPasswordError(true);
    else {
      const res: LoginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login, password})
      })
        .then((res) => res.json());

      if (res.user) {
        setUser(res.user);
        setLogin("");
        setPassword("");
        toggleModal(ModalKeys.LOGIN);
      }
      else if (res.error) setResError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, password]);
  
  return (
    <ModalBase modalKey={ModalKeys.LOGIN} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ModalTitleRow title={"Увійти до акаунта"} modalId={ModalKeys.LOGIN} />
        <Box component="form" noValidate sx={{ mt: 1, padding: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Логін"
            name="email"
            value={login}
            onChange={(event) => {
              if (loginError) setLoginError(false);
              if (resError) setResError(false);
              setLogin(event.target.value);
            } }
            error={loginError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
              if (passwordError) setPasswordError(false);
              if (resError) setResError(false);
              setPassword(event.target.value);
            }}
            error={passwordError}
          />
          <Typography color={resError ? "red" : "white"}>
            Введено невірні дані
          </Typography>
          <Button
            type="submit"
            color={"primary"}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={(event) => {
              event.preventDefault();
              void submit();
            }}
          >
            Увійти
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default LogInModal;
