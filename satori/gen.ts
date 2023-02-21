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

const globalAttributes = `
type globalAttributes = {
  readonly accesskey?: string;
  readonly class?: string;
  readonly contenteditable?: string;
  readonly dir?: string;
  readonly draggable?: string;
  readonly hidden?: string;
  readonly id?: string;
  readonly lang?: string;
  readonly spellcheck?: string;
  readonly style?: string;
  readonly tabindex?: string;
  readonly title?: string;
  readonly translate?: string;
};
`;

const attrValueStr = ({ boolean, enum: enum_ }: MetaAttribute): string =>
  boolean === true
    ? 'boolean'
    : enum_ !== undefined
    ? pipe(
        enum_,
        readonlyArray.filter((s) => !s.startsWith('/')),
        readonlyNonEmptyArray.fromReadonlyArray,
        option.map(
          flow(
            readonlyArray.map((s) => `'${s}'`),
            readonlyArray.intercalate(string.Monoid)('|')
          )
        ),
        option.getOrElseW(() => 'string')
      )
    : 'string';

const attrStr = (attrName: string, attr: Attribute): Option<string> =>
  Array.isArray(attr)
    ? option.none
    : pipe(
        attr,
        option.fromNullable,
        option.chain((metaAttr) =>
          metaAttr.required === true
            ? option.some(`    readonly '${attrName}': ${attrValueStr(metaAttr)};`)
            : option.some(`    readonly '${attrName}'?: ${attrValueStr(metaAttr)};`)
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
      `  readonly attributes: globalAttributes & {`,
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
  readonlyRecord.foldMapWithIndex(string.Ord)(string.Monoid)((_, val) => val),
  (x) => `/* eslint-disable */\n${globalAttributes}\n${x}`
);

const main = () => fs.writeFile(`${__dirname}/html.ts`, res);

void main();
