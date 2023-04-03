#!/usr/bin/env tsx
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import {
  console,
  option,
  readonlyArray as array,
  readonlyRecord as record,
  readonlyTuple,
  string,
  taskEither,
} from 'fp-ts';
import { flow, identity, pipe } from 'fp-ts/function';
import { match } from 'ts-pattern';

import type { MetaAttribute, MetaData as TagData } from './html5';
import { globalAttributes, html } from './html5';

const attrValueStr = ({ data }: MetaAttribute): string =>
  match(data)
    .with(undefined, () => 'string')
    .with({ type: 'boolean' }, () => 'true')
    .with({ type: 'number' }, () => 'number')
    .with({ type: 'enum' }, (enumData) =>
      pipe(
        enumData.value,
        array.map((s) => `'${s}'`),
        array.intercalate(string.Monoid)('|')
      )
    )
    .exhaustive();

const typeAttrStr = ({
  key,
  value,
  optional,
}: {
  readonly key: string;
  readonly value: string;
  readonly optional?: boolean;
}) => `    readonly '${key}' ` + `${optional === true ? '?' : ''}: ` + `${value};`;

const attrStr = (attrName: string, attr: MetaAttribute) =>
  typeAttrStr({ key: attrName, value: attrValueStr(attr), optional: attr.required !== true });

const attrsStr = (attrs: Record<string, MetaAttribute>): readonly string[] =>
  pipe(attrs, record.mapWithIndex(attrStr), record.toReadonlyArray, array.map(readonlyTuple.snd));

const normalizeCategory = string.replace('@', '_');

const normalizeName = (name: string) => (name === 'object' || name === 'var' ? `${name}_` : name);

const validAttributes: Record<string, TagData> = pipe(
  html,
  record.filterWithIndex((name) => !name.includes(':')),
  record.toReadonlyArray,
  array.map(([k, v]) => [normalizeName(k), v] as const),
  record.fromEntries
);

const stringMetadata: TagData = {
  flow: true,
  phrasing: true,
};

const tagAndString: Record<string, TagData> = pipe(
  validAttributes,
  record.upsertAt('string', stringMetadata)
);

const fss: Record<string, (at: TagData) => boolean> = {
  _meta: (at) => at.meta === true,
  _flow: (at) => at.flow === true,
  _sectioning: (at) => at.sectioning === true,
  _heading: (at) => at.heading === true,
  _phrasing: (at) => at.phrasing === true,
  _embedded: (at) => at.embedded === true,
  _interactive: (at) => at.interactive === true,
};

const getCategoryTags = (cat: string): readonly string[] =>
  cat.startsWith('@')
    ? pipe(
        fss,
        record.map((fsss) => pipe(tagAndString, record.filter(fsss), record.keys)),
        record.lookup(normalizeCategory(cat)),
        option.getOrElseW(() => [])
      )
    : [cat];

const allTags = record.keys(tagAndString);

const getPermittedContent = (data: TagData): readonly string[] =>
  pipe(
    data.permittedContent,
    option.fromNullable,
    option.map(array.chain(getCategoryTags)),
    option.getOrElseW(() => allTags)
  );

const getForbiddenDescendant = (data: TagData): readonly string[] =>
  pipe(
    data.forbiddenDescendant,
    option.fromNullable,
    option.map(array.chain(getCategoryTags)),
    option.getOrElseW(() => [])
  );

const getForbiddenChildFromPermittedParent = (name: string): readonly string[] =>
  pipe(
    tagAndString,
    record.filterMap((el) =>
      pipe(el.permittedParent, option.fromNullable, option.map(array.elem(string.Eq)(name)))
    ),
    record.filter((x) => !x),
    record.keys
  );

const groupByFirstCharacter = array.chop((aa: readonly string[]) => {
  const { init, rest } = pipe(
    aa,
    array.spanLeft((a) => a.startsWith(aa[0]?.[0] ?? ''))
  );
  return [init, rest];
});

// TODO: category doesn't exists error
const childrenStr = (name: string, data: TagData): string =>
  pipe(
    getPermittedContent(data),
    array.difference(string.Eq)(getForbiddenDescendant(data)),
    array.difference(string.Eq)(getForbiddenChildFromPermittedParent(name)),
    array.uniq(string.Eq),
    groupByFirstCharacter,
    array.map(array.intercalate(string.Monoid)(' | ')),
    array.map((x) => `    ${x}`),
    array.intercalate(string.Monoid)(' |\n')
  );

const tagToTypeString = (name: string, data: TagData): readonly string[] => [
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
export type NonVoidElement = {
  readonly tag: string, 
  readonly attributes: any, 
  readonly children: any[]
};

export type VoidElement = {
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

const allTypeUnionString = pipe(tagAndString, record.keys, array.intercalate(string.Monoid)('|'));

const res: string = pipe(
  validAttributes,
  record.mapWithIndex((name, data) => tagToTypeString(normalizeName(name), data)),
  record.toReadonlyArray,
  array.chain(readonlyTuple.snd),
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
    `export type All = ${allTypeUnionString};`,
  ],
  array.intercalate(string.Monoid)('\n')
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
