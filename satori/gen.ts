#!/usr/bin/env tsx
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import {
  console,
  option,
  readonlyArray,
  readonlyNonEmptyArray,
  readonlyRecord,
  readonlyTuple,
  string,
  taskEither,
} from 'fp-ts';
import { flow, identity, pipe } from 'fp-ts/function';
import { match } from 'ts-pattern';

import type { MetaAttribute, MetaData } from './html5';
import { globalAttributes, html } from './html5';

export const attrValueStr = ({ data }: MetaAttribute): string =>
  match(data)
    .with(undefined, () => 'string')
    .with({ type: 'boolean' }, () => 'true')
    .with({ type: 'number' }, () => 'number')
    .with({ type: 'enum' }, (enumData) =>
      pipe(
        enumData.value,
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

export const typeAttrStr = ({
  key,
  value,
  optional,
}: {
  readonly key: string;
  readonly value: string;
  readonly optional?: boolean;
}) => `    readonly '${key}' ` + `${optional === true ? '?' : ''}: ` + `${value};`;

export const attrStr = (attrName: string, attr: MetaAttribute) =>
  typeAttrStr({ key: attrName, value: attrValueStr(attr), optional: attr.required !== true });

const attrsStr = (attrs: Record<string, MetaAttribute>): readonly string[] =>
  pipe(
    attrs,
    readonlyRecord.mapWithIndex(attrStr),
    readonlyRecord.toReadonlyArray,
    readonlyArray.map(readonlyTuple.snd)
  );

const normalizeCategory = string.replace('@', '_');

const normalizeName = (name: string) => (name === 'object' || name === 'var' ? `${name}_` : name);

const validAttributes = pipe(
  html,
  readonlyRecord.filterWithIndex((name) => !name.includes(':')),
  readonlyRecord.toReadonlyArray,
  readonlyArray.map(([k, v]) => [normalizeName(k), v] as const),
  readonlyRecord.fromEntries
);

const textMetaData: MetaData = {
  flow: true,
  phrasing: true,
};

const vv = pipe(validAttributes, readonlyRecord.upsertAt('text', textMetaData));

const fss: Record<string, (at: MetaData) => boolean> = {
  _meta: (at) => at.meta === true,
  _flow: (at) => at.flow === true,
  _sectioning: (at) => at.sectioning === true,
  _heading: (at) => at.heading === true,
  _phrasing: (at) => at.phrasing === true,
  _embedded: (at) => at.embedded === true,
  _interactive: (at) => at.interactive === true,
};

const getCategoryTags = (cat: string) =>
  cat.startsWith('@')
    ? pipe(
        fss,
        readonlyRecord.map((fsss) => pipe(vv, readonlyRecord.filter(fsss), readonlyRecord.keys)),
        readonlyRecord.lookup(normalizeCategory(cat)),
        option.getOrElseW(() => [])
      )
    : [cat];

const getPermittedContent = (data: MetaData): readonly string[] =>
  pipe(
    data.permittedContent,
    option.fromNullable,
    option.map(readonlyArray.chain(getCategoryTags)),
    option.getOrElseW(() => readonlyRecord.keys(vv))
  );

const getForbiddenDescendant = (data: MetaData): readonly string[] =>
  pipe(
    data.forbiddenDescendant,
    option.fromNullable,
    option.map(readonlyArray.chain(getCategoryTags)),
    option.getOrElseW(() => [])
  );

const getForbiddenChildFromPermittedParent = (name: string): readonly string[] =>
  pipe(
    vv,
    readonlyRecord.filterMap((el) =>
      pipe(el.permittedParent, option.fromNullable, option.map(readonlyArray.elem(string.Eq)(name)))
    ),
    readonlyRecord.filter((x) => !x),
    readonlyRecord.keys
  );

// TODO: category doesn't exists error
const childrenStr = (name: string, data: MetaData): string =>
  pipe(
    getPermittedContent(data),
    readonlyArray.difference(string.Eq)(getForbiddenDescendant(data)),
    readonlyArray.difference(string.Eq)(getForbiddenChildFromPermittedParent(name)),
    readonlyArray.map((x) => `${x}`),
    readonlyArray.uniq(string.Eq),
    readonlyArray.intercalate(string.Monoid)('|')
  );

const toTs = (name: string, data: MetaData): readonly string[] => [
  `export type ${name} = {`,
  `  readonly type: '${name}';`,
  `  readonly attributes: globalAttributes & {`,
  ...attrsStr({ ...data.attributes }),
  `  };`,
  `  readonly children: (${data.void === true ? 'never' : childrenStr(name, data)})[];`,
  `};`,
  '',
  `export const ${name} = builder<${name}>('${name}')`,
  '',
];

const builder = `
export const builder = <T extends {type: string, attributes: any, children: any[]}>(type: T['type']) => 
(attributes: T['attributes'], ...children: T['children']) => 
({
  type,
  attributes,
  children
})
`;

const textEl = `
export type text = {
  readonly type: 'text';
  readonly children: string;
}

export const text = (children: string): text => ({
  type: 'text',
  children
})
`;

const res: string = pipe(
  validAttributes,
  readonlyRecord.mapWithIndex((name, data) => toTs(normalizeName(name), data)),
  readonlyRecord.toReadonlyArray,
  readonlyArray.map(readonlyTuple.snd),
  readonlyArray.flatten,
  (arr) => [
    `/* eslint-disable */`,
    '',
    builder,
    '',
    textEl,
    '',
    `export type globalAttributes = {`,
    ...attrsStr(globalAttributes),
    '};',
    '',
    ...arr,
  ],
  readonlyArray.intercalate(string.Monoid)('\n')
);

const write = (content: string) =>
  taskEither.tryCatch(() => fs.writeFile(`${__dirname}/html.ts`, content), identity);

const main = pipe(
  res,
  taskEither.of,
  taskEither.chainFirstW(write),
  taskEither.orElseFirstIOK(flow((x) => JSON.stringify(x, undefined, 2), console.error))
);

// eslint-disable-next-line functional/no-expression-statement
void main();
