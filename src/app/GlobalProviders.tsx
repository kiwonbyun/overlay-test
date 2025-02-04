"use client";
import { OverlayProvider } from "@/overlay/OverlayProvider";
import { PropsWithChildren } from "react";

export const GlobalProviders = ({ children }: PropsWithChildren) => {
  return <OverlayProvider>{children}</OverlayProvider>;
};
