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

export type HTMLAttributes<T extends HTMLTag> = OmitReactAttribues<
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

export type HTMLElement<T extends HTMLTag> = {
  readonly tag: T;
  readonly attributes: HTMLAttributes<T>;
  readonly children: readonly (HTMLElement<HTMLTag> | SVGElement<'svg'> | string)[];
};

type Nen<T> = ReaderTaskEither<never, never, T>;

type MapNen<T> = {
  readonly [P in keyof T]: Nen<T[P]>;
};

const demap = <T>(m: MapNen<T>) => readonlyRecord.sequence(nen.ApplicativePar)(m) as Nen<T>;

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;

export const h = <T extends HTMLTag>(
  tag: HTMLElement<T>['tag'],
  attributes: EnforceNonEmptyRecord<MapNen<HTMLElement<T>['attributes']>>,
  ...children: MapNen<HTMLElement<T>['children']>
): Nen<HTMLElement<T>> => {
  const attributesNenz = apply.sequenceS(nen.ApplyPar)(attributes);
  return pipe(
    nen.Do,
    nen.bind('childrenNen', () => readonlyArray.sequence(nen.ApplicativePar)(children)),
    nen.bind('attributesNen', () => attributesNenz),
    nen.map(({ childrenNen, attributesNen }) => ({
      tag,
      attributes: attributesNen,
      children: childrenNen,
    }))
  );
};

export const c = nen.of;
