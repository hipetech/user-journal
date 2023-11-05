import "../styles/globals.css";

import { CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import React from "react";

import ModalRoot from "@/modals/modalRoot";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Users journal"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <ModalRoot />
        <CssBaseline />
      </body>
    </html>
  );
}
