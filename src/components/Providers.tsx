"use client"

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

function Providers({children}:Props) {
  return ( <ThemeProvider>{children}</ThemeProvider> );
}

export default Providers;