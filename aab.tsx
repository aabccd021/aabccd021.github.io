import * as fs from 'node:fs/promises'
import React from 'react';
import satori from 'satori'

const main = async() => {
const font = await fs.readFile('./inter-latin-ext-700-normal.woff');
const result = await satori(
  <div style={{ color: 'red' }}>hello, aaa</div>,
  {
    width: 600,
    height: 400,
    fonts: [
{
      name: 'Inter',
      data: font,
      weight: 400,
      style: 'normal',
    },
    ]
  },
)
await fs.writeFile('aab.svg', result, { encoding: 'utf8' })
}

main()
