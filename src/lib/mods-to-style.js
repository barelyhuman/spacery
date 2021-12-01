const marginsPattern = /(margin)[TBRLXY]*-/
const paddingsPattern = /(padding)[TBRLXY]*-/
const XPattern = /X$/
const YPattern = /Y$/

const toDimension = (value, unit) => (unit ? value + unit : Number(value))

/**
 * @name modsToStyle
 * @description convert given modifiers object of the form
 * {margin-10:true} into a style object => {margin:10} with an appended dimensionUnit (eg: "px")
 * @param {Object} mods Object of spacing modifiers
 * @param {string} dimensionUnit Dimension to append to the style value `(default: "px")
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

    // prop will be of format eg: marginR-8
    const _propSplit = key.split('-')

    // accessor to be normalized eg: marginR
    const accessorProp = _propSplit[0]

    // change the accessor to it's style equivalent eg: marginR => marginRight
    const normalizedAccessorProp =
      (/T$/.test(accessorProp) && accessorProp.replace(/T$/, 'Top')) ||
      (/L$/.test(accessorProp) && accessorProp.replace(/L$/, 'Left')) ||
      (/B$/.test(accessorProp) && accessorProp.replace(/B$/, 'Bottom')) ||
      (/R$/.test(accessorProp) && accessorProp.replace(/R$/, 'Right')) ||
      accessorProp

    // if not one of the above then check for accessor as X or Y , eg: marginX or marginY
    if (XPattern.test(normalizedAccessorProp)) {
      const _prop = normalizedAccessorProp.replace(XPattern, '')
      style[_prop + 'Left'] = toDimension(_propSplit[1], dimensionUnit)
      style[_prop + 'Right'] = toDimension(_propSplit[1], dimensionUnit)
    } else if (YPattern.test(normalizedAccessorProp)) {
      const _prop = normalizedAccessorProp.replace(YPattern, '')
      style[_prop + 'Top'] = toDimension(_propSplit[1], dimensionUnit)
      style[_prop + 'Bottom'] = toDimension(_propSplit[1], dimensionUnit)
    } else {
      style[normalizedAccessorProp] = toDimension(_propSplit[1], dimensionUnit)
    }
  })
  return { style, sanitizedProps }
}
