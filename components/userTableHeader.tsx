import { TableCell, TableHead, TableRow } from "@mui/material";
import React, { useMemo } from "react";

export const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: 0,
  },
  {
    id: "login",
    label: "Логін",
    minWidth: 0,
  },
  {
    id: "firstName",
    label: "Імʼя",
    minWidth: 0,
  },
  {
    id: "lastName",
    label: "Прізвище",
    minWidth: 0,
  },
  {
    id: "email",
    label: "Електронна пошта",
    minWidth: 0,
  },
  {
    id: "permissions",
    label: "Права доступу",
    minWidth: 0,
  },
];

function renderColumns() {
  return columns.map((col) => {
    return (
      <TableCell key={col.id} style={{minWidth: col.minWidth}} align={"center"}>
        {col.label}
      </TableCell>
    );
  });
}

const UserTableHeader = () => {
  const tableColumns = useMemo(() => renderColumns(), []);
  return (
    <TableHead>
      <TableRow>
        {tableColumns}
        <TableCell />
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default UserTableHeader;
