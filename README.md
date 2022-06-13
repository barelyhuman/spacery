# spacery

Space Modifier utilities for working with React

## About

This is my interpretation on how [React Native UI LIB](https://wix.github.io/react-native-ui-lib/) handles the Spacing modifiers and since I work with web a lot, it'll make it easier to have the same helpers on both places.

## Installation

```sh
npm i spacery
# or
yarn add spacery
```

## Usage

The library can be used in various ways to give you the end result of being able to use the modified or created custom component as shown below.

```jsx
// Margins
<Box marginX-8 />
<Box marginY-8 />
<Box margin-8 />
<Box marginL-8 />
<Box marginR-8 />
<Box marginT-8 />
<Box marginB-8 />

// Paddings
<Box paddingX-8 />
<Box paddingY-8 />
<Box padding-8 />
<Box paddingL-8 />
<Box paddingR-8 />
<Box paddingT-8 />
<Box paddingB-8 />
```

Self-explanatory as to what the library does.
Getting to how you can create the above `Box` component.

## API

### Manually

Not always needed unless you are working with a platform that needs you to change the dimension units from pixels to something else, let's say `rem` or an empty string for something like react-native

```jsx
import { View } from 'react-native'
import { modsToStyle } from 'spacery'

const Box = function ({ children, ...props }) {
  const { style, sanitizedProps } = modsToStyle(props, '') // pass dimension as an empty string so it used the actual numbers
  return (
    <View style={style} {...sanitizedProps}>
      {children}
    </View>
  )
}

export default Box
```

### Spacery Component

What you'll be using the most if you work with the web since the component already handles the basics of being a wrapper box components

```jsx
import { View } from 'react-native'
import { Spacery } from 'spacery'

const Box = Spacery

export default Box
```

### Spacery HOC

This is another way of using spacery where, in case you don't want to do it manually but want to support something that's not the web, aka `react-native`

```jsx
import { View } from 'react-native'
import { withSpacery } from 'spacery'

const Box = withSpacery(function ({ style, children, ...props }) {
  // the `style` prop already handles the overwritten values that might come from the Box component
  return (
    <View style={style} {...props}>
      {children}
    </View>
  )
}, '')
// empty string, so it doesn't add `px`
// to the end of the units, like it would for the web style

export default Box
```

## License

[MIT](LICENSE)
