import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "../styles/globals.css";
import React from "react";
import ModalProvider from "@/modals/modalProvider";

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
        <ModalProvider />
      </body>
    </html>
  );
}
