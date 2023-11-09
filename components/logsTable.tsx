import { Box, Table, TableCell, TableContainer, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import React, { useMemo } from "react";

import { formatDateNumber } from "@/helpers/formatDateNumber";
import { Log } from "@/types/log";

interface LogsTableProps {
  logs: Log[]
}

function renderLogs(logs: Log[]) {
  return logs.map((log, index) => {
    
    const date = new Date(log.date);
    
    return (
      <TableRow hover={true} key={log.id}>
        <TableCell>
          {index + 1}
        </TableCell>
        <TableCell>
          {`${date.getHours()}:${date.getMinutes()} ${formatDateNumber(date.getDate())}.${formatDateNumber(date.getMonth())}.${date.getFullYear()}`}
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
          {log.user.firstName}
        </TableCell>
      </TableRow>
    );
  });
}

const LogsTable: React.FC<LogsTableProps> = ({logs}) => {
  const logItems = useMemo(() => renderLogs(logs), [logs]);
  
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      overflow: "auto"
    }}>
      <TableContainer>
        <Table>
          <TableBody>
            {logItems}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LogsTable;
