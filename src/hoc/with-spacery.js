import React from 'react'
import { modsToStyle } from '../lib/mods-to-style.js'

export function withSpacery (Component, dimensionUnit) {
  return ({ style, ...props }) => {
    const { style: modifiersStyle, sanitizedProps } = modsToStyle(
      props,
      dimensionUnit
    )
    return (
      <Component style={{ ...modifiersStyle, ...style }} {...sanitizedProps} />
    )
  }
}
