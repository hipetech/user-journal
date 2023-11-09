"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import Loader from "@/components/loader";
import LogsTable from "@/components/logsTable";
import ModalTitleRow from "@/components/modalTitleRow";
import ModalBase from "@/modals/modalBase";
import { ModalKeys } from "@/modals/modalKeys";
import { Log } from "@/types/log";

const LogsModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [logs, setLogs] = useState<Log[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (isOpen) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`)
        .then((res) => res.json())
        .then((res: {logs: Log[]}) => {
          setLogs(res.logs);
          setIsLoading(false);
        });
    }
  }, [isOpen]);
  
  return (
    <ModalBase modalKey={ModalKeys.LOGS} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Box>
        <ModalTitleRow title={"Логи"} modalId={ModalKeys.LOGS} />
        <Box sx={{
          width: 800,
          height: 500,
          overflow: "auto"
        }}>
          {isLoading ? <Loader /> : <LogsTable logs={logs} />}
        </Box>
      </Box>
    </ModalBase>
  );
};

export default LogsModal;
