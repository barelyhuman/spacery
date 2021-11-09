import React from "react";
import { modsToStyle } from "../lib/mods-to-style";

export function withSpacery(Component) {
  return ({ style, ...props }) => {
    const { style: modifiersStyle, sanitizedProps } = modsToStyle(props);
    return (
      <Component style={{ ...modifiersStyle, ...style }} {...sanitizedProps} />
    );
  };
}
