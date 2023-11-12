"use client";

import LoginIcon from "@mui/icons-material/Login";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Table, TableContainer, TablePagination } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import InfoBox from "@/components/infoBox";
import Loader from "@/components/loader";
import UserTableBody from "@/components/userTableBody";
import UserTableHeader from "@/components/userTableHeader";
import { AppEmmiter } from "@/helpers/emmiter";
import { toggleModal } from "@/helpers/toggleModal";
import useLogIn from "@/hooks/useLogIn";
import usePermissions from "@/hooks/usePermissions";
import { ModalKeys } from "@/modals/modalKeys";
import { AppEvents } from "@/types/appEvents";
import { Permission } from "@/types/permission";
import { User } from "@/types/user";

const rowsPerPage = 8;
const UserTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  
  const checkPermissions = usePermissions();
  const isLoggedIn = useLogIn();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canView = useMemo(() => checkPermissions(Permission.READ), [isLoggedIn]);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const fetchData = useCallback(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then((data: {users: User[]}) => {
        setUsers(data.users);
        setIsLoading(false);
      });
  }, []);
  
  
  const usersPerPage = useMemo(() => users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, users]);
  
  const content = useMemo(() => {
    if (!isLoggedIn) return <InfoBox message={"Увійдіть до акаунту"} icon={<LoginIcon color={"primary"} sx={{width: 70, height: 70}} />} />;
    else if (!canView) return <InfoBox message={"Ви не маєте прав для перегляду"} icon={<RemoveRedEyeIcon color={"primary"} sx={{width: 70, height: 70}} />} />;
    else if (isLoading) return <Loader />;
    else {
      return (
        <TableContainer>
          <Table>
            <UserTableHeader />
            <UserTableBody users={usersPerPage} />
          </Table>
        </TableContainer>
      );
    }
  }, [canView, isLoading, isLoggedIn, usersPerPage]);
  
  useEffect(() => {
    if (isLoggedIn && canView) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  
  useEffect(() => {
    AppEmmiter.on(AppEvents.REFETCH_DATA,  fetchData);
    return () => {
      AppEmmiter.off(AppEvents.REFETCH_DATA);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Box sx={{
      marginTop: 3,
      overflow: "auto",
      height: 600
    }}>
      {content}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 15,
        left: 0,
        width: "100%",
        paddingX: 2,
      }}>
        <Button variant={"contained"} disabled={!checkPermissions(Permission.EXECUTE)} onClick={() => toggleModal(ModalKeys.ADD_USER)}>
          Додати користувача
        </Button>
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[5]}
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default UserTable;
