---
title: initial-commit
date: 2023-01-30 14:05:08
tags:
---

Initial commit


``` ts
import * as diff from 'diff';
import { readonlyArray, string } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { match } from 'ts-pattern';

import type { Change, DiffLines } from '../../type';

const removeLastChar = (str: string) =>
  pipe(
    str,
    string.split(''),
    readonlyArray.dropRight(1),
    readonlyArray.intercalate(string.Monoid)('')
  );
```
