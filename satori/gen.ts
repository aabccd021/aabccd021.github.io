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
import { match } from 'ts-pattern';

import type { MetaAttribute, MetaData, PermittedAttribute } from './html5';
import { globalAttributes, html } from './html5';

const attrValueStr = ({ type }: MetaAttribute): string =>
  match(type)
    .with(undefined, () => 'string')
    .with({ type: 'boolean' }, () => 'true')
    .with({ type: 'number' }, () => 'number')
    .with({ type: 'enum' }, (enumType) =>
      pipe(
        enumType.value,
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
    )
    .exhaustive();

const attrStr = (attrName: string, attr: MetaAttribute): string =>
  `    readonly '${attrName}' ` +
  `${attr.required === true ? '' : '?'}: ` +
  `${attrValueStr(attr)};`;

const attrsStr = (attr: PermittedAttribute | undefined): readonly string[] =>
  pipe(
    attr,
    option.fromNullable,
    option.map(
      flow(
        readonlyRecord.mapWithIndex(attrStr),
        readonlyRecord.toReadonlyArray,
        readonlyArray.map(readonlyTuple.snd)
      )
    ),
    option.getOrElseW(() => [])
  );

const toTs = (name: string, _data: MetaData): readonly string[] =>
  pipe([
    `export type ${name} = {`,
    `  readonly type: '${name}';`,
    `  readonly attributes: globalAttributes & {`,
    ...attrsStr(_data.attributes),
    `  };`,
    `};`,
    '',
  ]);

const normalizeName = (name: string) => (name === 'object' || name === 'var' ? `${name}_` : name);

const res: string = pipe(
  html,
  readonlyRecord.filterWithIndex((name) => !name.includes(':')),
  readonlyRecord.mapWithIndex((name, data) => toTs(normalizeName(name), data)),
  readonlyRecord.toReadonlyArray,
  readonlyArray.chain(readonlyTuple.snd),
  (arr) => [`export type globalAttributes = {`, ...attrsStr(globalAttributes), '};', '', ...arr],
  readonlyArray.prepend(`/* eslint-disable */`),
  readonlyArray.intercalate(string.Monoid)('\n')
);

const main = () => fs.writeFile(`${__dirname}/html.ts`, res);

void main();
