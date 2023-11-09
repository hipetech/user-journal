import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, IconButton, TableCell, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import React, { useMemo } from "react";

import { columns } from "@/components/userTableHeader";
import { User } from "@/types/user";

function renderRows(users: User[]) {
  return users.map((user, index) => {
    return (
      <TableRow hover={true} key={user.id}>
        <TableCell>
          {index + 1}
        </TableCell>
        {
          columns.map((column) => {
            return (
              <TableCell style={{minWidth: column.minWidth}} align={"center"} key={column.id + user.id}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-ignore*/}
                {column.id === "permissions" ? user[column.id].join(" · ") : user[column.id]}
              </TableCell>
            );
          })
        }
        <TableCell>
          <Button color="primary">Редагувати</Button>
        </TableCell>
        <TableCell>
          <IconButton size={"small"} onClick={() => console.log("hello world")}>
            <DeleteOutlineIcon color={"disabled"}/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });
}

interface TableBodyProps {
  users: User[]
}

const UserTableBody: React.FC<TableBodyProps> = ({users}) => {
  
  const tableRows = useMemo(() => renderRows(users), [users]);
  return (
    <TableBody>
      {tableRows}
    </TableBody>
  );
};

export default UserTableBody;
