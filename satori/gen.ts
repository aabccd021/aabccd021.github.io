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
        readonlyNonEmptyArray.map((s) => `'${s}'`),
        readonlyNonEmptyArray.intercalate(string.Monoid)('|')
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

const stringMetadata: MetaData = {
  flow: true,
  phrasing: true,
};

const tagAndString = pipe(validAttributes, readonlyRecord.upsertAt('string', stringMetadata));

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
        readonlyRecord.map((fsss) =>
          pipe(tagAndString, readonlyRecord.filter(fsss), readonlyRecord.keys)
        ),
        readonlyRecord.lookup(normalizeCategory(cat)),
        option.getOrElseW(() => [])
      )
    : [cat];

const allTags = readonlyRecord.keys(tagAndString);

const getPermittedContent = (data: MetaData): readonly string[] =>
  pipe(
    data.permittedContent,
    option.fromNullable,
    option.map(readonlyArray.chain(getCategoryTags)),
    option.getOrElseW(() => allTags)
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
    tagAndString,
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
    readonlyArray.uniq(string.Eq),
    readonlyArray.chunksOf(8),
    readonlyArray.map(readonlyArray.intercalate(string.Monoid)(' | ')),
    readonlyArray.map((x) => `    ${x}`),
    readonlyArray.intercalate(string.Monoid)(' |\n')
  );

const toTs = (name: string, data: MetaData): readonly string[] => [
  `export type ${name} = {`,
  `  readonly tag: '${name}';`,
  `  readonly attributes: globalAttributes & {`,
  ...attrsStr({ ...data.attributes }),
  `  };`,
  ...(data.void === true ? [] : [`  readonly children: (`, childrenStr(name, data), `  )[];`]),
  `};`,
  '',
  `export const ${name} = ${data.void === true ? 'voidBuilder' : 'builder'}<${name}>('${name}')`,
  '',
];

const prefix = `
type NonVoidElement = {
  readonly tag: string, 
  readonly attributes: any, 
  readonly children: any[]
};

type VoidElement = {
  readonly tag: string, 
  readonly attributes: any
};

export const builder = <T extends NonVoidElement>(tag: T['tag']) => 
(attributes: T['attributes'], ...children: T['children']) => 
({ tag, attributes, children })


export const voidBuilder = <T extends VoidElement>(tag: T['tag']) => 
(attributes: T['attributes']) => 
({ tag, attributes, })
`;

const allTypeStr = pipe(
  tagAndString,
  readonlyRecord.keys,
  readonlyArray.intercalate(string.Monoid)('|')
);

const res: string = pipe(
  validAttributes,
  readonlyRecord.mapWithIndex((name, data) => toTs(normalizeName(name), data)),
  readonlyRecord.toReadonlyArray,
  readonlyArray.chain(readonlyTuple.snd),
  (arr) => [
    `/* eslint-disable */`,
    '',
    prefix,
    '',
    `export type globalAttributes = {`,
    ...attrsStr(globalAttributes),
    '};',
    '',
    ...arr,
    '',
    `export type All = ${allTypeStr};`,
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
