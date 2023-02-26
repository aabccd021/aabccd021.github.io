import type { ClassAttributes, DOMAttributes, HTMLAttributes, ReactDOM } from 'react';

export type Tag = keyof ReactDOM;

export type ReactSpecificAttributes =
  | 'defaultChecked'
  | 'defaultValue'
  | 'suppressContentEditableWarning'
  | 'suppressHydrationWarning';

export type ComponentSpecificEventHandler = 'onCancel' | 'onClose' | 'onToggle';

export type OmitReactAttribues<T> = T extends HTMLAttributes<infer K>
  ? Omit<
      T,
      | ComponentSpecificEventHandler
      | ReactSpecificAttributes
      | keyof ClassAttributes<K>
      | keyof DOMAttributes<K>
    >
  : never;

export type Attributes<T extends Tag> = OmitReactAttribues<NonNullable<Parameters<ReactDOM[T]>[0]>>;

export const a: Attributes<'a'> = {
  'aria-atomic': 'true',
};

export const dialog: Attributes<'dialog'> = {};

export const anmiate: Attributes<'clipPath'> = {
  accentHeight: 10,
};
