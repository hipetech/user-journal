import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import React, { useMemo } from "react";

import { formatDateNumber } from "@/helpers/formatDateNumber";
import { Log } from "@/types/log";

interface LogsTableProps {
  logs: Log[]
}

function renderLogs(logs: Log[]) {
  return [...logs].reverse().map((log, index) => {
    
    const date = new Date(log.date);
    
    return (
      <TableRow hover={true} key={log.id}>
        <TableCell>
          {index + 1}
        </TableCell>
        <TableCell>
          {`${formatDateNumber(date.getHours())}:${formatDateNumber(date.getMinutes())} ${formatDateNumber(date.getDate())}.${formatDateNumber(date.getMonth())}.${date.getFullYear()}`}
        </TableCell>
        <TableCell>
          {log.type}
        </TableCell>
        <TableCell>
          {log.user.login}
        </TableCell>
        <TableCell>
          {log.user.firstName}
        </TableCell>
        <TableCell>
          {log.user.lastName}
        </TableCell>
      </TableRow>
    );
  });
}

const LogsTable: React.FC<LogsTableProps> = ({logs}) => {
  const logItems = useMemo(() => renderLogs(logs), [logs]);
  
  return (
    <TableContainer sx={{
      height: "inherit"
    }}>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>
              #
            </TableCell>
            <TableCell>
              Час та дата
            </TableCell>
            <TableCell>
              Тип дії
            </TableCell>
            <TableCell>
              Логін
            </TableCell>
            <TableCell>
              Імʼя
            </TableCell>
            <TableCell>
              Прізвище
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logItems}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
