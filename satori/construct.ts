/* eslint-disable prettier/prettier */
/// <reference lib="dom" />

export type Z = HTMLButtonElement['contentEditable'];

export type ElementSpec = {
  readonly a: {
    readonly attributes: {
      readonly download?: string;
      readonly target: '_blank' | '_parent' | '_self' | '_top';
    };
  };
  readonly area: {
    readonly attributes: {
      readonly href: string;
    };
  };
};

export type Tag = keyof ElementSpec;

export type Attribute<T extends Tag> = ElementSpec[T]['attributes'];

export type Element<T extends Tag> = {
  readonly tag: T;
  readonly attributes: Attribute<T>;
};

export const h = <T extends Tag>(tag: T, attributes: Attribute<T>): Element<T> => ({
  tag,
  attributes,
});

export const a = h('a', { target: '_top' });
