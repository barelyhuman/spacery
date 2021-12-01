import avaTest from 'ava'
import { modsToStyle } from '../src/lib/mods-to-style.js'

const test = avaTest.serial

test('Direction Props | Single', async (t) => {
  const props = {
    'marginT-8': true
  }

  const expected = {
    marginTop: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Direction Props | Multiple', async (t) => {
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

test('Axis Props | Single', async (t) => {
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

test('Axis Props | Multiple', async (t) => {
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

test('Axis Props + Dimension Props', async (t) => {
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

test('Axis Props + Dimension Props 2', async (t) => {
  const props = {
    'marginL-16': true,
    // overrides based on order
    'marginX-8': true
  }

  const expected = {
    marginRight: '8px',
    marginLeft: '8px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('Axis Props + Dimension Props 3', async (t) => {
  const props = {
    'marginX-8': true,
    // overrides based on order
    'marginL-16': true
  }

  const expected = {
    marginRight: '8px',
    marginLeft: '16px'
  }

  const { style } = modsToStyle(props, 'px')
  t.deepEqual(style, expected)
})

test('No dimension suffix', async (t) => {
  const props = {
    'marginX-8': true,
    // overrides based on order
    'marginL-16': true
  }

  const expected = {
    marginRight: 8,
    marginLeft: 16
  }

  const { style } = modsToStyle(props, '')
  t.deepEqual(style, expected)
})
