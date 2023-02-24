#!/usr/bin/env tsx
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import {
  console,
  either,
  option,
  readonlyArray,
  readonlyNonEmptyArray,
  readonlyRecord,
  readonlyTuple,
  separated,
  string,
  taskEither,
} from 'fp-ts';
import type { Either } from 'fp-ts/Either';
import { flow, identity, pipe } from 'fp-ts/function';
import type { Option } from 'fp-ts/Option';
import { match } from 'ts-pattern';

import type { MetaAttribute, MetaData } from './html5';
import { globalAttributes, html } from './html5';

const attrValueStr = ({ data }: MetaAttribute): string =>
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
  pipe(
    attrs,
    readonlyRecord.mapWithIndex(attrStr),
    readonlyRecord.toReadonlyArray,
    readonlyArray.map(readonlyTuple.snd)
  );

type AttrNotPresent = {
  readonly type: 'AttrNotPresent';
};

type ExpectedAttributeIsNotEnum = {
  readonly type: 'ExpectedAttributeIsNotEnum';
};

type AllowedIfAttrPresentErr = {
  readonly type: 'AllowedIfAttrPresentErr';
  readonly name: string;
  readonly err: AttrNotPresent;
};

type AllowedIfAttrAbsentErr = {
  readonly type: 'AllowedIfAttrAbsentErr';
  readonly name: string;
  readonly err: AttrNotPresent;
};

type AllowedIfAttrHasValueErr = {
  readonly type: 'AllowedIfAttrHasValueErr';
  readonly err: AttrNotPresent | ExpectedAttributeIsNotEnum;
};

type IfAttrPresentErr = {
  readonly type: 'IfAttrPresentErr';
  readonly attrName: string;
  readonly err: AllowedIfAttrAbsentErr | AllowedIfAttrHasValueErr | AllowedIfAttrPresentErr;
};

type ElementErr = {
  readonly type: 'ElementErr';
  readonly name: string;
  readonly err: IfAttrPresentErr;
};

const liftAllowedAttrErr =
  <T>(fn: (name: string) => Either<AttrNotPresent, T>) =>
  (name: string): Either<AllowedIfAttrPresentErr, T> =>
    pipe(
      fn(name),
      either.mapLeft((err) => ({ type: 'AllowedIfAttrPresentErr', name, err }))
    );

const wrapRecord = (ra: readonly string[]) =>
  readonlyArray.isEmpty(ra) ? [] : [`  & (`, `    | Record<string, never>`, ...ra, `  )`];

const allowedIfAttrPresentStr = (
  attrName: string,
  attr: MetaAttribute,
  allowedAttrs: readonly string[],
  allAttrs: Record<string, MetaAttribute>
): Either<AllowedIfAttrPresentErr, readonly string[]> =>
  pipe(
    allowedAttrs,
    readonlyArray.traverse(either.Applicative)(
      liftAllowedAttrErr((allowedAttributeName) =>
        pipe(
          allAttrs,
          readonlyRecord.lookup(allowedAttributeName),
          either.fromOption(() => ({ type: 'AttrNotPresent' as const })),
          either.map((allowedAttr) => [
            `  | {`,
            `  ${typeAttrStr({
              key: allowedAttributeName,
              value: attrValueStr(allowedAttr),
            })}`,
            `  ${typeAttrStr({ key: attrName, value: attrValueStr(attr), optional: true })}`,
            `  }`,
          ])
        )
      )
    ),
    either.map(flow(readonlyArray.flatten, wrapRecord))
  );

const liftAllowedAttrAbsentErr =
  <T>(fn: (name: string) => Either<AttrNotPresent, T>) =>
  (name: string): Either<AllowedIfAttrAbsentErr, T> =>
    pipe(
      fn(name),
      either.mapLeft((err) => ({ type: 'AllowedIfAttrAbsentErr', name, err }))
    );

const allowedIfAttrAbsentStr = (
  attrName: string,
  attr: MetaAttribute,
  allowedAttrs: readonly string[],
  allAttrs: Record<string, MetaAttribute>
): Either<AllowedIfAttrAbsentErr, readonly string[]> =>
  pipe(
    allowedAttrs,
    readonlyArray.traverse(either.Applicative)(
      liftAllowedAttrAbsentErr(
        either.fromPredicate(
          (name) => readonlyRecord.has(name, allAttrs),
          () => ({ type: 'AttrNotPresent' as const })
        )
      )
    ),
    either.map(
      flow(
        readonlyArray.map((allowedName) =>
          typeAttrStr({ key: allowedName, value: 'undefined', optional: true })
        ),
        (alloweds) => [
          `| {`,
          `  ${typeAttrStr({ key: attrName, value: attrValueStr(attr), optional: false })}`,
          ...alloweds,
          `}`,
        ]
      )
    )
  );

const allowedIfAttrHasValueStr = (
  attrName: string,
  attr: MetaAttribute,
  targetAttrName: string,
  expectedValue: readonly string[],
  allAttrs: Record<string, MetaAttribute>
): Either<AllowedIfAttrHasValueErr, readonly string[]> =>
  pipe(
    allAttrs,
    readonlyRecord.lookup(targetAttrName),
    either.fromOption(() => ({ type: 'AttrNotPresent' as const })),
    either.chainW(
      (targetAttr): Either<ExpectedAttributeIsNotEnum, readonly string[]> =>
        targetAttr.data?.type === 'enum'
          ? pipe(
              targetAttr.data.value,
              readonlyArray.partition((v) => readonlyArray.elem(string.Eq)(v, expectedValue)),
              separated.bimap(
                flow(
                  readonlyArray.map((x) => `'${x}'`),
                  readonlyArray.intercalate(string.Monoid)('|'),
                  (v) => [
                    `| {`,
                    `  ${typeAttrStr({ key: targetAttrName, value: `${v}`, optional: true })}`,
                    `  ${typeAttrStr({ key: attrName, value: 'undefined' })}`,
                    `}`,
                  ]
                ),
                flow(
                  readonlyArray.map((x) => `'${x}'`),
                  readonlyArray.intercalate(string.Monoid)('|'),
                  (v) => [
                    `| {`,
                    `  ${typeAttrStr({ key: targetAttrName, value: `${v}`, optional: true })}`,
                    `  ${attrStr(attrName, attr)}`,
                    `}`,
                  ]
                )
              ),
              ({ left, right }) => [...left, ...right],
              wrapRecord,
              either.right
            )
          : either.left({ type: 'ExpectedAttributeIsNotEnum' as const })
    ),
    either.mapLeft((err) => ({ type: 'AllowedIfAttrHasValueErr', err }))
  );

const liftIfAttrPresentErr =
  <T>(fn: (attrName: string, attr: MetaAttribute) => Option<Either<IfAttrPresentErr['err'], T>>) =>
  (attrName: string, attr: MetaAttribute): Option<Either<IfAttrPresentErr, T>> =>
    pipe(
      fn(attrName, attr),
      option.map(either.mapLeft((err) => ({ type: 'IfAttrPresentErr', attrName, err })))
    );

const lift1 = (attrs: Record<string, MetaAttribute>): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    attrs,
    readonlyRecord.filterMapWithIndex(
      liftIfAttrPresentErr(
        (attrName, attr): Option<Either<IfAttrPresentErr['err'], readonly string[]>> =>
          pipe(
            attr.allowed?.type === 'allowedIfAttributeIsPresent'
              ? option.some(allowedIfAttrPresentStr(attrName, attr, attr.allowed.attrs, attrs))
              : attr.allowed?.type === 'allowedIfAttributeHasValue'
              ? option.some(
                  allowedIfAttrHasValueStr(
                    attrName,
                    attr,
                    attr.allowed.key,
                    attr.allowed.expectedValue,
                    attrs
                  )
                )
              : option.none
          )
      )
    ),
    readonlyRecord.toReadonlyArray,
    readonlyArray.traverse(either.Applicative)(readonlyTuple.snd),
    either.map(readonlyArray.flatten)
  );

const lift2 = (attrs: Record<string, MetaAttribute>): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    attrs,
    readonlyRecord.filterMapWithIndex(
      liftIfAttrPresentErr(
        (attrName, attr): Option<Either<IfAttrPresentErr['err'], readonly string[]>> =>
          pipe(
            attr.allowed?.type === 'allowedIfAttributeIsAbsent'
              ? option.some(allowedIfAttrAbsentStr(attrName, attr, attr.allowed.attrs, attrs))
              : option.none
          )
      )
    ),
    readonlyRecord.toReadonlyArray,
    readonlyArray.traverse(either.Applicative)(readonlyTuple.snd),
    either.map(flow(readonlyArray.flatten, wrapRecord))
  );

const strictAttributeStr = (
  attrs: Record<string, MetaAttribute>
): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    [lift1(attrs), lift2(attrs)],
    readonlyArray.sequence(either.Applicative),
    either.map(readonlyArray.flatten)
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
          pipe(validAttributes, readonlyRecord.filter(fsss), readonlyRecord.keys)
        ),
        readonlyRecord.lookup(normalizeCategory(cat)),
        option.getOrElseW(() => [])
      )
    : [cat];

const getPermittedContent = (data: MetaData): readonly string[] =>
  pipe(
    data.permittedContent,
    option.fromNullable,
    option.map(readonlyArray.chain(getCategoryTags)),
    option.getOrElseW(() => readonlyRecord.keys(validAttributes))
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
    validAttributes,
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

const toTs = (name: string, data: MetaData): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    strictAttributeStr({ ...globalAttributes, ...data.attributes }),
    either.map((strictAttributes) => [
      `export type ${name} = {`,
      `  readonly type: '${name}';`,
      `  readonly attributes: globalAttributes & {`,
      ...attrsStr({ ...data.attributes }),
      `  }`,
      ...strictAttributes,
      `  ;`,
      `  readonly children: (${childrenStr(name, data)})[];`,
      `};`,
      '',
      `export const ${name} = builder<${name}>('${name}')`,
      '',
    ])
  );

const liftElementErr =
  <T>(fn: (name: string, data: MetaData) => Either<IfAttrPresentErr, T>) =>
  (name: string, data: MetaData): Either<ElementErr, T> =>
    pipe(
      fn(name, data),
      either.mapLeft((err) => ({ type: 'ElementErr', name, err }))
    );

const builder = `
export const builder = <T extends {type: string, attributes: any, children: any[]}>(type: T['type']) => 
(attributes: T['attributes'], ...children: T['children']) => 
({
  type,
  attributes,
  children
})
`;

const res: Either<ElementErr, string> = pipe(
  validAttributes,
  readonlyRecord.mapWithIndex(liftElementErr((name, data) => toTs(normalizeName(name), data))),
  readonlyRecord.toReadonlyArray,
  readonlyArray.traverse(either.Applicative)(readonlyTuple.snd),
  either.map(
    flow(
      readonlyArray.flatten,
      (arr) => [
        `/* eslint-disable */`,
        '',
        builder,
        '',
        `export type globalAttributes = {`,
        ...attrsStr(globalAttributes),
        '};',
        '',
        ...arr,
      ],
      readonlyArray.intercalate(string.Monoid)('\n')
    )
  )
);

const write = (content: string) =>
  taskEither.tryCatch(() => fs.writeFile(`${__dirname}/html.ts`, content), identity);

const main = pipe(
  res,
  taskEither.fromEither,
  taskEither.chainFirstW(write),
  taskEither.orElseFirstIOK(flow((x) => JSON.stringify(x, undefined, 2), console.error))
);

// eslint-disable-next-line functional/no-expression-statement
void main();
