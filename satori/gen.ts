#!/usr/bin/env tsx
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import {
  option,
  readonlyArray,
  readonlyNonEmptyArray,
  readonlyRecord,
  readonlyTuple,
  string,
} from 'fp-ts';
import { flow, pipe } from 'fp-ts/function';
import type { Option } from 'fp-ts/Option';

import type { Attribute, MetaAttribute, MetaData } from './html5';
import { html } from './html5';

const attrValueStr = (attr: MetaAttribute): string =>
  attr.boolean === true ? 'boolean' : 'string';

const attrStr = (attrName: string, attr: Attribute): Option<string> =>
  Array.isArray(attr)
    ? option.none
    : pipe(
        attr,
        option.fromNullable,
        option.chain((metaAttr) =>
          metaAttr.required === true
            ? option.some(`    readonly ${attrName}: ${attrValueStr(metaAttr)};`)
            : option.none
        )
      );

const attrsStr = (_data: MetaData): readonly string[] =>
  pipe(
    _data.attributes,
    option.fromNullable,
    option.map(
      flow(
        readonlyRecord.filterMapWithIndex(attrStr),
        readonlyRecord.toReadonlyArray,
        readonlyArray.map(readonlyTuple.snd)
      )
    ),
    option.getOrElseW(() => [])
  );

const toTs = (name: string, _data: MetaData): string =>
  pipe(
    [
      `export type ${name} = {`,
      `  readonly type: '${name}';`,
      `  readonly attributes: {`,
      ...attrsStr(_data),
      `  };`,
      `};\n`,
    ],
    readonlyNonEmptyArray.map((s) => `${s}\n`),
    readonlyNonEmptyArray.concatAll(string.Semigroup)
  );

const normalizeName = (name: string) => (name === 'object' || name === 'var' ? `${name}_` : name);

const res: string = pipe(
  html,
  readonlyRecord.filterWithIndex(
    (name, data) => name !== '*' && !name.includes(':') && data.deprecated === undefined
  ),
  readonlyRecord.mapWithIndex((name, data) => toTs(normalizeName(name), data)),
  readonlyRecord.foldMapWithIndex(string.Ord)(string.Monoid)((_, val) => val)
);

const main = () => fs.writeFile(`${__dirname}/html.ts`, res);

void main();
