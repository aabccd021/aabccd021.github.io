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
type NonNullableFirstParam<T extends (...args: any) => any> = NonNullable<Parameters<T>[0]>;

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
  readonly attribues: SVGAttributes<T>;
  readonly children: readonly SVGElement<T>[];
};

export type HTMLElement<T extends HTMLTag> = {
  readonly tag: T;
  readonly attribues: HTMLAttributes<T>;
  readonly children: HTMLElement<HTMLTag> | readonly SVGElement<'svg'>[];
};
