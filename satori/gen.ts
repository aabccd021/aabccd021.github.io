#!/usr/bin/env tsx
/* eslint-disable import/no-nodejs-modules */
import * as fs from 'node:fs/promises';

import {
  console,
  either,
  option,
  readonlyArray as expectedValues,
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
            expectedValues.map((s) => `'${s}'`),
            expectedValues.intercalate(string.Monoid)('|')
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
    expectedValues.map(readonlyTuple.snd)
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
  expectedValues.isEmpty(ra) ? [] : [`  & (`, `    | Record<string, never>`, ...ra, `  )`];

const allowedIfAttrPresentStr = (
  attrName: string,
  attr: MetaAttribute,
  allowedAttrs: readonly string[],
  allAttrs: Record<string, MetaAttribute>
): Either<AllowedIfAttrPresentErr, readonly string[]> =>
  pipe(
    allowedAttrs,
    expectedValues.traverse(either.Applicative)(
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
    either.map(flow(expectedValues.flatten, wrapRecord))
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
    expectedValues.traverse(either.Applicative)(
      liftAllowedAttrAbsentErr(
        either.fromPredicate(
          (name) => readonlyRecord.has(name, allAttrs),
          () => ({ type: 'AttrNotPresent' as const })
        )
      )
    ),
    either.map(
      flow(
        expectedValues.map((allowedName) =>
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
    expectedValues.traverse(either.Applicative)(readonlyTuple.snd),
    either.map(expectedValues.flatten)
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
    expectedValues.traverse(either.Applicative)(readonlyTuple.snd),
    either.map(flow(expectedValues.flatten, wrapRecord))
  );

const handleAllowedIfAttrPresent = (
  attrs: Record<string, MetaAttribute>
): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    [lift1(attrs), lift2(attrs)],
    readonlyArray.sequence(either.Applicative),
    either.map(expectedValues.flatten)
  );

const toTs = (name: string, data: MetaData): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    handleAllowedIfAttrPresent({ ...globalAttributes, ...data.attributes }),
    either.map((alloweds) => [
      `export type ${name} = {`,
      `  readonly type: '${name}';`,
      `  readonly attributes: globalAttributes & {`,
      ...attrsStr({ ...data.attributes }),
      `  }`,
      ...alloweds,
      `  ;`,
      `};`,
      '',
    ])
  );

const normalizeName = (name: string) => (name === 'object' || name === 'var' ? `${name}_` : name);

const liftElementErr =
  <T>(fn: (name: string, data: MetaData) => Either<IfAttrPresentErr, T>) =>
  (name: string, data: MetaData): Either<ElementErr, T> =>
    pipe(
      fn(name, data),
      either.mapLeft((err) => ({ type: 'ElementErr', name, err }))
    );

const res: Either<ElementErr, string> = pipe(
  html,
  readonlyRecord.filterWithIndex((name) => !name.includes(':')),
  readonlyRecord.mapWithIndex(liftElementErr((name, data) => toTs(normalizeName(name), data))),
  readonlyRecord.toReadonlyArray,
  expectedValues.traverse(either.Applicative)(readonlyTuple.snd),
  either.map(
    flow(
      expectedValues.flatten,
      (arr) => [
        `export type globalAttributes = {`,
        ...attrsStr(globalAttributes),
        '};',
        '',
        ...arr,
      ],
      expectedValues.prepend(`/* eslint-disable */`),
      expectedValues.intercalate(string.Monoid)('\n')
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

export type a = {
  readonly type: 'a';
  readonly attributes: // globalAttributes &
  {
    readonly href?: string;
    readonly download?: string;
    readonly hreflang?: string;
    readonly itemprop?: string;
    readonly ping?: string;
    readonly referrerpolicy?: string;
    readonly rel?: string;
    readonly target?: '_blank' | '_parent' | '_self' | '_top';
    readonly type?: string;
  } & (
    | Record<string, never>
    | {
        readonly href: string;
        readonly download?: string;
      }
  );
};

export const aab: a['attributes'] = {
  href: 'a',
  download: 'a',
};

// @ts-expect-error haha
export const aab2: a['attributes'] = {
  download: 'a',
};

export const aab3: a['attributes'] = {
  href: 'a',
};

export const aab4: a['attributes'] = {
  // href: 'a',
};

export type meta = {
  readonly type: 'meta';
  readonly attributes: //globalAttributes &
  // eslint-disable-next-line @typescript-eslint/sort-type-constituents
  {
    readonly charset?: 'utf-8';
    readonly content?: string;
    readonly 'http-equiv'?: string;
    readonly itemprop?: string;
    readonly name?: string;
  } & (
    | Record<string, never>
    | {
        readonly 'http-equiv': string;
        readonly content?: string;
      }
    | {
        readonly itemprop: string;
        readonly content?: string;
      }
    | {
        readonly name: string;
        readonly content?: string;
      }
  ) &
    (
      | Record<string, never>
      | { readonly 'http-equiv': string; readonly name?: undefined; readonly itemprop?: undefined }
      | { readonly 'http-equiv'?: undefined; readonly name: string; readonly itemprop?: undefined }
      | { readonly 'http-equiv'?: undefined; readonly name?: undefined; readonly itemprop: string }
    );
};

export const metaAttrImpl: meta['attributes'] = {
  name: '',
  content: '',
};

export const metaAttrImpl3: meta['attributes'] = {
  name: '',
};

export const metaAttrImpl5: meta['attributes'] = {
  itemprop: '',
  content: '',
};

export const metaAttrImpl7: meta['attributes'] = {
  itemprop: '',
};

// @ts-expect-error haha
export const metaAttrImpl2: meta['attributes'] = {
  content: '',
};

// @ts-expect-error haha
export const metaAttrImpl8: meta['attributes'] = {
  'http-equiv': '',
  name: '',
};

// @ts-expect-error haha
export const metaAttrImpl10: meta['attributes'] = {
  'http-equiv': '',
  itemprop: '',
};

// @ts-expect-error haha
export const metaAttrImpl9: meta['attributes'] = {
  name: '',
  itemprop: '',
};

export const metaAttrImpl4: meta['attributes'] = {};

export type button = {
  readonly type: 'button';
  readonly attributes:
    | {
        readonly autofocus?: true;
        readonly disabled?: true;
        readonly formaction?: string;
        readonly formenctype?: string;
        readonly formmethod?: 'dialog' | 'get' | 'post';
        readonly formnovalidate?: true;
        readonly formtarget?: '_blank' | '_parent' | '_self' | '_top';
        readonly type?: 'button' | 'reset' | 'submit';
      } & (
        | Record<string, never>
        | {
            readonly type?: 'button' | 'reset';
            readonly formaction: undefined;
          }
        | {
            readonly type?: 'submit';
            readonly formaction?: string;
          }
      );
};

export const buttonImplA: button['attributes'] = {};

export const buttonImpl0: button['attributes'] = {
  type: 'submit',
};

export const buttonImpl1: button['attributes'] = {
  type: 'submit',
  formaction: '',
};

// @ts-expect-error haha
export const buttonImpl2: button['attributes'] = {
  type: 'reset',
  formaction: '',
};

export const buttonImpl3: button['attributes'] = {
  formaction: '',
};

export type input = {
  readonly type: 'input';
  readonly attributes: {
    readonly autofocus?: true;
    readonly capture?: 'environment' | 'user';
    readonly checked?: true;
    readonly disabled?: true;
    readonly formaction?: string;
    readonly formenctype?: string;
    readonly formmethod?: 'dialog' | 'get' | 'post';
    readonly formnovalidate?: true;
    readonly formtarget?: '_blank' | '_parent' | '_self' | '_top';
    readonly inputmode?:
      | 'decimal'
      | 'email'
      | 'none'
      | 'numeric'
      | 'search'
      | 'tel'
      | 'text'
      | 'url';
    readonly multiple?: true;
    readonly readonly?: true;
    readonly required?: true;
    readonly spellcheck?: 'default' | 'false' | 'true';
    readonly type?:
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week';
  } & (
    | Record<string, never>
    | {
        readonly type?: 'button' | 'reset';
        readonly formaction: undefined;
      }
    | {
        readonly type?: 'image' | 'submit';
        readonly formaction?: string;
      }
  );
};

export const inputImplA: input['attributes'] = {};

export const inputImpl0: input['attributes'] = {
  type: 'submit',
};

export const inputImpl1: input['attributes'] = {
  type: 'submit',
  formaction: '',
};

// @ts-expect-error haha
export const inputImpl2: input['attributes'] = {
  type: 'reset',
  formaction: '',
};

export const inputImpl3: input['attributes'] = {
  formaction: '',
};

export const inputImpl8: input['attributes'] = {
  type: 'image',
};

export const inputImpl9: input['attributes'] = {
  type: 'image',
  formaction: '',
};
