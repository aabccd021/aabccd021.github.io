import {
  either,
  option,
  readonlyArray,
  readonlyRecord,
  readonlyTuple,
  separated,
  string,
} from 'fp-ts';
import type { Either } from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/function';
import type { Option } from 'fp-ts/Option';

import { attrStr, attrValueStr, typeAttrStr } from './gen';
import type { MetaAttribute } from './html5';

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

export const strictAttributeStr = (
  attrs: Record<string, MetaAttribute>
): Either<IfAttrPresentErr, readonly string[]> =>
  pipe(
    [lift1(attrs), lift2(attrs)],
    readonlyArray.sequence(either.Applicative),
    either.map(readonlyArray.flatten)
  );
