const marginsPattern = /(margin)[TBRLXY]*-/
const paddingsPattern = /(padding)[TBRLXY]*-/
const XPattern = /X$/
const YPattern = /Y$/

/**
 * @name modsToStyle
 * @description convert given modifiers object of the form
 * {margin-10:true} into a style object => {margin:10} with an appended dimensionUnit (eg: "px")
 * @param {Object} mods Object of spacing modifiers
 * @param {string} dimensionUnit Dimension to append to the style value (default: "px")
 * @returns result
 * @returns result.style
 * @returns result.santizedProps
 */
export function modsToStyle (mods, dimensionUnit = 'px') {
  const style = {}
  const sanitizedProps = { ...mods }
  Object.keys(mods).forEach((key) => {
    if (!(marginsPattern.test(key) || paddingsPattern.test(key))) {
      return
    }

    delete sanitizedProps[key]

    const _propSplit = key.split('-')
    const normalizedProp = _propSplit[0]
      .replace(/T$/, 'Top')
      .replace(/L$/, 'Left')
      .replace(/B$/, 'Bottom')
      .replace(/R$/, 'Right')
    if (XPattern.test(normalizedProp)) {
      const _prop = normalizedProp.replace(XPattern, '')
      style[_prop + 'Left'] = _propSplit[1] + dimensionUnit
      style[_prop + 'Right'] = _propSplit[1] + dimensionUnit
    } else if (YPattern.test(normalizedProp)) {
      const _prop = normalizedProp.replace(YPattern, '')
      style[_prop + 'Top'] = _propSplit[1] + dimensionUnit
      style[_prop + 'Bottom'] = _propSplit[1] + dimensionUnit
    } else {
      style[normalizedProp] = _propSplit[1] + dimensionUnit
    }
  })
  return { style, sanitizedProps }
}
