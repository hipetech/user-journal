"use client";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import InfoBox from "@/components/infoBox";
import Loader from "@/components/loader";
import LogsTable from "@/components/logsTable";
import ModalTitleRow from "@/components/modalTitleRow";
import usePermissions from "@/hooks/usePermissions";
import ModalBase from "@/modals/modalBase";
import { ModalKeys } from "@/modals/modalKeys";
import { Log } from "@/types/log";
import { Permission } from "@/types/permission";

const LogsModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [logs, setLogs] = useState<Log[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const checkPermissions = usePermissions();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canView = useMemo(() => checkPermissions(Permission.READ), [isOpen]);
  
  useEffect(() => {
    if (isOpen && canView) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`)
        .then((res) => res.json())
        .then((res: {logs: Log[]}) => {
          setLogs(res.logs);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {
            canView
              ? isLoading ? <Loader /> : <LogsTable logs={logs} />
              : <InfoBox message={"Ви не маєте прав для перегляду"} icon={<RemoveRedEyeIcon color={"primary"} sx={{width: 70, height: 70}} />} />
          }
        </Box>
      </Box>
    </ModalBase>
  );
};

export default LogsModal;
