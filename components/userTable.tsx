"use client";

import {
  Box, Button, Table,
  TableContainer,
  TablePagination
} from "@mui/material";
import React, { useEffect, useState } from "react";

import UserTableBody from "@/components/userTableBody";
import UserTableHeader from "@/components/userTableHeader";
import { User } from "@/types/user";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  
  const windowHeight = window.screen.height - window.screen.height * 0.3;
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then((data: {users: User[]}) => setUsers(data.users));
  }, []);
  
  return (
    <Box sx={{
      marginTop: 3,
      overflow: "auto",
      height: windowHeight ?? 0,
      position: "relative"
    }}>
      <TableContainer>
        <Table>
          <UserTableHeader />
          <UserTableBody users={users} />
        </Table>
      </TableContainer>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        paddingX: 2,
      }}>
        <Button variant={"contained"}>Додати користувача</Button>
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[]}
          count={Math.ceil(users.length / 20)}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default UserTable;
