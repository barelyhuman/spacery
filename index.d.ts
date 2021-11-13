import { ReactNode } from "react";

export function Spacery(props: any): ReactNode;
export function withSpacery(
  Component: ReactNode,
  dimensionUnit?: string
): ReactNode;
export function modsToStyle(
  mods: any,
  dimensionUnit?: string
): { style: any; sanitizedProps: any };
