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
}) => `    readonly '${key}' ` + `${optional === true ? '' : '?'}: ` + `${value};`;

const attrStr = (attrName: string, attr: MetaAttribute) =>
  typeAttrStr({ key: attrName, value: attrValueStr(attr), optional: attr.required });

const attrsStr = (attrs: Record<string, MetaAttribute>): readonly string[] =>
  pipe(
    attrs,
    readonlyRecord.mapWithIndex(attrStr),
    readonlyRecord.toReadonlyArray,
    readonlyArray.map(readonlyTuple.snd)
  );

type AttrNotExist = {
  readonly type: 'AttrNotExist';
};

type AllowedAttrErr = {
  readonly type: 'AllowedAttrErr';
  readonly name: string;
  readonly err: AttrNotExist;
};

const liftAllowedAttrErr =
  <T>(fn: (name: string) => Either<AttrNotExist, T>) =>
  (name: string): Either<AllowedAttrErr, T> =>
    pipe(
      fn(name),
      either.mapLeft((err) => ({ type: 'AllowedAttrErr', name, err }))
    );

const zz = (
  attrName: string,
  attr: MetaAttribute,
  allowedAttrs: readonly string[],
  allAttrs: Record<string, MetaAttribute>
): Either<AllowedAttrErr, readonly string[]> =>
  pipe(
    allowedAttrs,
    readonlyArray.traverse(either.Applicative)(
      liftAllowedAttrErr((allowedAttributeName) =>
        pipe(
          allAttrs,
          readonlyRecord.lookup(allowedAttributeName),
          either.fromOption(() => ({ type: 'AttrNotExist' as const })),
          either.map((allowedAttr) => [
            `  | {`,
            `  ${attrStr(allowedAttributeName, allowedAttr)}`,
            `  ${typeAttrStr({ key: attrName, value: attrValueStr(attr), optional: true })}`,
            `  }`,
          ])
        )
      )
    ),
    either.map(readonlyArray.flatten)
  );

type IfAttrPresentErr = {
  readonly type: 'IfAttrPresentErr';
  readonly attrName: string;
  readonly err: AllowedAttrErr;
};

const liftIfAttrPresentErr =
  <T>(fn: (attrName: string, attr: MetaAttribute) => Option<Either<AllowedAttrErr, T>>) =>
  (attrName: string, attr: MetaAttribute): Option<Either<IfAttrPresentErr, T>> =>
    pipe(
      fn(attrName, attr),
      option.map(either.mapLeft((err) => ({ type: 'IfAttrPresentErr', attrName, err })))
    );

const allowedIfAttrPresent = (
  attrs: Record<string, MetaAttribute>
): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    attrs,
    readonlyRecord.filterMapWithIndex(
      liftIfAttrPresentErr((attrName, attr) =>
        attr.allowed?.type === 'allowedIfAttributeIsPresent'
          ? option.some(zz(attrName, attr, attr.allowed.attrs, attrs))
          : option.none
      )
    ),
    readonlyRecord.toReadonlyArray,
    readonlyArray.traverse(either.Applicative)(readonlyTuple.snd),
    either.map(readonlyArray.flatten),
    either.map((ra) =>
      readonlyArray.isEmpty(ra) ? [] : [`  & (`, `    | Record<string, never>`, ...ra, `  )`]
    )
  );

const toTs = (name: string, data: MetaData): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    allowedIfAttrPresent({ ...globalAttributes, ...data.attributes }),
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

type ElementErr = {
  readonly type: 'ElementErr';
  readonly name: string;
  readonly err: IfAttrPresentErr;
};

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
  readonlyArray.traverse(either.Applicative)(readonlyTuple.snd),
  either.map(
    flow(
      readonlyArray.flatten,
      (arr) => [
        `export type globalAttributes = {`,
        ...attrsStr(globalAttributes),
        '};',
        '',
        ...arr,
      ],
      readonlyArray.prepend(`/* eslint-disable */`),
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

export const a = (attributes: a['attributes']): a => ({
  type: 'a',
  attributes,
});

export const aab: a = a({
  href: 'a',
  download: 'a',
});

// @ts-expect-error haha
export const aab2: a = a({
  // href: 'a',
  download: 'a',
});

export const aab3: a = a({
  href: 'a',
  // download: 'a',
});

export const aab4: a = a({
  // href: 'a',
  // download: 'a',
});

export type meta = {
  readonly type: 'meta';
  readonly attributes: //globalAttributes &
  // eslint-disable-next-line @typescript-eslint/sort-type-constituents
  {
    readonly charset?: 'utf-8';
    readonly content?: string;
    readonly 'http-equiv'?: string;
    readonly itemprop?: string;
    readonly property?: string;
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
    | {
        readonly property: string;
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
            readonly type: 'button';
            readonly formaction: undefined;
          }
        | {
            readonly type: 'reset';
            readonly formaction: undefined;
          }
        | {
            readonly type: 'submit';
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

// @ts-expect-error haha
export const buttonImpl3: button['attributes'] = {
  formaction: '',
};
