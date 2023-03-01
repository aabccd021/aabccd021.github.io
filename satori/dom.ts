import { apply, readerTaskEither as nen, readonlyArray, readonlyRecord } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import type { ReaderTaskEither } from 'fp-ts/ReaderTaskEither';
import type * as React from 'react';

type OmitReactAttribues<T> = T extends React.HTMLAttributes<infer K>
  ? Omit<
      T,
      | keyof React.ClassAttributes<K>
      | keyof React.DOMAttributes<K>
      | 'defaultChecked'
      | 'defaultValue'
      | 'onCancel'
      | 'onClose'
      | 'onToggle'
      | 'suppressContentEditableWarning'
      | 'suppressHydrationWarning'
    >
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn = (...args: any) => any;

type NonNullableFirstParam<T extends AnyFn> = NonNullable<Parameters<T>[0]>;

export type HTMLTag = keyof React.ReactHTML;

export type SVGTag = keyof React.ReactSVG;

export type HTMLAttributes<T extends HTMLTag = HTMLTag> = OmitReactAttribues<
  NonNullableFirstParam<React.ReactHTML[T]>
>;

export type SVGAttributes<T extends SVGTag> = OmitReactAttribues<
  NonNullableFirstParam<React.ReactSVG[T]>
>;

export const a: HTMLAttributes<'a'> = {
  'aria-atomic': 'true',
};

export const dialog: HTMLAttributes<'dialog'> = {};

export const anmiate: SVGAttributes<'svg'> = {
  accentHeight: 10,
};

export type SVGElement<T extends SVGTag> = {
  readonly tag: T;
  readonly attributes: SVGAttributes<T>;
  readonly children: readonly SVGElement<T>[];
};

export type HTMLElementChildren = readonly (HTMLElement<HTMLTag> | SVGElement<'svg'> | string)[];

export type HTMLElement<T extends HTMLTag> = {
  readonly tag: T;
  readonly attributes: HTMLAttributes;
  readonly children: HTMLElementChildren;
};

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;

type Nen<T> = ReaderTaskEither<number, number, T>;

type MapNen<T> = EnforceNonEmptyRecord<{
  readonly [P in keyof T]: Nen<T[P]>;
}>;

const demap = (m: MapNen<HTMLAttributes>): Nen<HTMLAttributes> =>
  readonlyRecord.sequence(nen.ApplicativePar)(m);

const demap2 = (m: MapNen<HTMLAttributes>): Nen<HTMLAttributes> =>
  apply.sequenceS(nen.ApplicativePar)(m);

const demap3 = demap2;

export const h = <T extends HTMLTag>(
  tag: HTMLElement<T>['tag'],
  attributes: MapNen<HTMLAttributes<T>>,
  ...children: MapNen<HTMLElementChildren>
): Nen<HTMLElement<T>> => {
  const a = apply.sequenceS(nen.ApplicativePar)(attributes);
  const b = readonlyRecord.sequence(nen.ApplicativePar)(attributes);
  const c: Nen<HTMLAttributes<T>> = demap2(attributes);
  return pipe(
    apply.sequenceS(nen.ApplicativePar)({
      children: readonlyArray.sequence(nen.ApplicativePar)(children),
      attributes: apply.sequenceS(nen.ApplicativePar),
    }),
    nen.map((resolved) => ({
      tag,
      attributes: resolved.attributes,
      children: resolved.children,
    }))
  );
};
export const c = nen.of;

// eslint-disable-next-line import/no-self-import
export const b = import('./dom').then((k) => k.c);
