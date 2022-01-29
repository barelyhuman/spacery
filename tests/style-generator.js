import test from 'ava'
import { modsToStyle } from '../src/lib/mods-to-style.js'

test('Direction Props | Single', t => {
  const props = {
    'marginT-8': true
  }

  const expected = {
    marginTop: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Direction Props | Multiple', t => {
  const props = {
    'marginT-8': true,
    'marginR-8': true,
    'marginB-8': true,
    'marginL-8': true
  }

  const expected = {
    marginTop: '8px',
    marginRight: '8px',
    marginBottom: '8px',
    marginLeft: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Axis Props | Single', t => {
  const props = {
    'marginX-8': true
  }

  const expected = {
    marginRight: '8px',
    marginLeft: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Axis Props | Multiple', t => {
  const props = {
    'marginX-8': true,
    'marginY-8': true
  }

  const expected = {
    marginTop: '8px',
    marginRight: '8px',
    marginBottom: '8px',
    marginLeft: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Axis Props + Dimension Props', t => {
  const props = {
    'marginX-8': true,
    'marginT-8': true
  }

  const expected = {
    marginTop: '8px',
    marginRight: '8px',
    marginLeft: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Axis Props + Dimension Props 2', t => {
  const props = {
    'marginL-16': true,
    // Overrides based on order
    'marginX-8': true
  }

  const expected = {
    marginRight: '8px',
    marginLeft: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Axis Props + Dimension Props 3', t => {
  const props = {
    'marginX-8': true,
    // Overrides based on order
    'marginL-16': true
  }

  const expected = {
    marginRight: '8px',
    marginLeft: '16px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('No dimension suffix', t => {
  const props = {
    'marginX-8': true,
    // Overrides based on order
    'marginL-16': true
  }

  const expected = {
    marginRight: 8,
    marginLeft: 16
  }

  const { style } = modsToStyle(props, '')
  t.deepEqual(style, expected)
})

test('Test composed style', t => {
  const composedSet = [
    {
      props: {
        'marginT-12': true,
        'marginB-12': true,
        'marginX-8': true
      },
      expected: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 12,
        marginBottom: 12
      }
    },
    {
      props: {
        'marginT-12': true,
        'marginX-8': true
      },
      expected: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 12
      }
    },
    {
      props: {
        'marginY-12': true,
        'marginX-8': true
      },
      expected: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 12,
        marginBottom: 12
      }
    }
  ]

  for (const setItem of composedSet) {
    const { style } = modsToStyle(setItem.props, '')
    t.deepEqual(style, setItem.expected)
  }
})
