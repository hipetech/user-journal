"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  Stack,
  TextField
} from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import randomEmail from "random-email";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import randomFirstName from "random-firstname";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import randomLastName from "random-lastname";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import generateRandomUsername from "random-username-gen";
import React, { useCallback, useState } from "react";
import { v4 } from "uuid";

import ModalTitleRow from "@/components/modalTitleRow";
import { openSnackbar } from "@/helpers/openSnackbar";
import { updateUsers } from "@/helpers/updateUsers";
import ModalBase from "@/modals/modalBase";
import { ModalKeys } from "@/modals/modalKeys";
import { SnackbarKeys } from "@/snackbars/snackbarKeys";
import { useUserStore } from "@/store/userStore";
import { Permission } from "@/types/permission";
import { PostUser } from "@/types/postUser";


function checkError(value: string, setValue: (value: boolean) => void) {
  if (value.length < 2) setValue(true);
}

const AddUserModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // values
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // checkbox values
  const [writePermission, setWritePermission] = useState<boolean>(false);
  const [readPermission, setReadPermission] = useState<boolean>(false);
  const [executePermission, setExecutePermission] = useState<boolean>(false);
  
  // errors
  const [loginError, setLoginError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [surnameError, setSurnameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [checkboxError, setCheckboxError] = useState<boolean>(false);
  
  // password input
  const [passwordInputVisible, setPasswordInputVisible] = useState<boolean>(false);
  
  const setAllValues = useCallback((
    login: string,
    email: string,
    name: string,
    surname: string,
    password: string,
    writePermission: boolean,
    readPermission: boolean,
    executePermission: boolean
  ) => {
    setLogin(login);
    setEmail(email);
    setName(name);
    setSurname(surname);
    setPassword(password);
    setWritePermission(writePermission);
    setReadPermission(readPermission);
    setExecutePermission(executePermission);
  }, []);
  
  const resetValues = useCallback(() => {
    setAllValues(
      "",
      "",
      "",
      "",
      "",
      false,
      false,
      false,
    );
  }, [setAllValues]);
  
  const resetCheckboxError = useCallback(() => {
    if (checkboxError) setCheckboxError(false);
  }, [checkboxError]);
  
  const resetErrors = useCallback(() => {
    setLoginError(false);
    setEmailError(false);
    setNameError(false);
    setSurnameError(false);
    setPasswordError(false);
    setCheckboxError(false);
  }, []);
  
  const checkErrors = useCallback(() => Boolean(
    login.length &&
    email.length &&
    name.length &&
    surname.length &&
    password.length &&
    (writePermission || readPermission || executePermission)),
  [
    email.length,
    executePermission,
    login.length, name.length,
    password.length,
    readPermission,
    surname.length,
    writePermission
  ]);
  
  const generateValues = useCallback(() => {
    setAllValues(
      generateRandomUsername("", {separator: ""}),
      randomEmail(),
      randomFirstName(),
      randomLastName(),
      Math.random().toString(36).slice(-8),
      Boolean(Math.random() < 0.5),
      Boolean(Math.random() < 0.5),
      Boolean(Math.random() < 0.5)
    );
    
    if (!checkErrors()) resetErrors();
  }, [checkErrors, resetErrors, setAllValues]);
  
  const {user} = useUserStore();
  
  const submit = () => {
    checkError(login, setLoginError);
    checkError(email, setEmailError);
    checkError(name, setNameError);
    checkError(surname, setSurnameError);
    checkError(password, setPasswordError);
    
    if (!writePermission && !readPermission && !executePermission) {
      setCheckboxError(true);
    }
    
    if (checkErrors()) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          newUser: {
            id: v4(),
            firstName: name,
            lastName: surname,
            permissions: [
              writePermission ? Permission.WRITE : "-",
              readPermission ? Permission.READ : "-",
              executePermission ? Permission.EXECUTE : "-"
            ],
            login: login,
            email: email,
            password: password
          },
          user: user
        } as PostUser)
      })
        .then(() => {
          openSnackbar(SnackbarKeys.ADD_USER);
          updateUsers();
          resetValues();
        });
    }
    
  };
  
  return (
    <ModalBase modalKey={ModalKeys.ADD_USER} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box component={"form"} sx={{width: 650}}>
        <ModalTitleRow title={"Додати користувача"} modalId={ModalKeys.ADD_USER} />
        <Stack padding={2} gap={2}>
          <Stack direction={"row"} gap={2}>
            <TextField
              fullWidth={true}
              label="Логін"
              variant="outlined"
              value={login}
              error={loginError}
              onChange={(event) => {
                if (loginError) setLoginError(false);
                setLogin(event.target.value);
              }}
            />
            <TextField
              fullWidth={true}
              label="Електронна пошта" variant="outlined"
              value={email}
              error={emailError}
              onChange={(event) => {
                if (emailError) setEmailError(false);
                setEmail(event.target.value);
              }}
            />
          </Stack>
          <Stack direction={"row"} gap={1}>
            <TextField
              fullWidth={true}
              label="Імʼя"
              variant="outlined"
              value={name}
              error={nameError}
              onChange={(event) => {
                if (nameError) setNameError(false);
                setName(event.target.value);
              }}
            />
            <TextField
              fullWidth={true}
              label="Прізвище"
              variant="outlined"
              value={surname}
              error={surnameError}
              sx={{marginRight: 1}}
              onChange={(event) => {
                if (surnameError) setSurnameError(false);
                setSurname(event.target.value);
              }}
            />
            <Stack direction={"row"} minWidth={300} gap={2}>
              <TextField
                fullWidth={true}
                label="Пароль"
                variant="outlined"
                type={passwordInputVisible ? "text" : "password"}
                value={password}
                error={passwordError}
                onChange={(event) => {
                  if (passwordError) setPasswordError(false);
                  setPassword(event.target.value);
                }}
              />
              <IconButton size={"small"} onClick={() => setPasswordInputVisible(value => !value)}>
                {passwordInputVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Stack>
          </Stack>
          <FormControl error={checkboxError} variant={"standard"} sx={{width: "100%", justifyContent: "flex-end"}}>
            <FormGroup row={true} sx={{width: "100%", justifyContent: "flex-end"}}>
              <FormControlLabel
                control={<Checkbox />}
                label="Write"
                checked={writePermission}
                onChange={(_, checked) => {
                  resetCheckboxError();
                  setWritePermission(checked);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Read"
                checked={readPermission}
                onChange={(_, checked) => {
                  resetCheckboxError();
                  setReadPermission(checked);
                }}/>
              <FormControlLabel
                control={<Checkbox />}
                label="Execute"
                checked={executePermission}
                onChange={(_, checked) => {
                  resetCheckboxError();
                  setExecutePermission(checked);
                }}/>
            </FormGroup>
            {
              checkboxError && (
                <FormHelperText sx={{width: "100%", textAlign: "right"}}>
                  Оберіть хоча б один варіант
                </FormHelperText>
              )
            }
          </FormControl>
          <Stack direction={"row"} gap={2} justifyContent={"flex-end"}>
            <Button variant="outlined" onClick={generateValues}>Генерувати дані</Button>
            <Button
              variant="contained"
              type={"submit"}
              onClick={(event) => {
                event.preventDefault();
                submit();
              }}>
              Додати користувача
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ModalBase>
  );
};

export default AddUserModal;
