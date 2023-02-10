---
title: pnpm install recursively with flake.nix shellHook

date: 2023-02-10 11:09:18
tags: 
  - pnpm
  - flake
  - nix
  - github
  - github-actions
image:
  src: ./thumbnail.png
  alt: typing pnpm install on CLI
---

```
❯ pnpm install
```

# TLDR
```nix
# flake.nix
{
  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux; {
    devShell.x86_64-linux = mkShellNoCC {
      shellHook = ''
        for npm_dir in $(git ls-files | grep pnpm-lock.yaml); do pnpm install --dir $(dirname "$npm_dir"); done || exit 1
      '';
    };
  };
}
```

# Background

Setting up a project each time being clone can become cumbersome over time.
Instead, I want my pnpm projects to automatically install packages when first time I clone the repository.
More than that, I want it to install packages for all subdirectories that has `pnpm-lock.yaml`.

# Objectives

## Simpler GitHub Actions workflow file
We can run the project on GitHub Actions without explicitly specifying `pnpm install` on job step.

### Before
```yaml
    steps:
      - run: nix develop # will run `shellHook` inside `flake.nix`
      - run: pnpm install
      - run: pnpm build
```

### After
```yaml
    steps:
      - run: nix develop # will run `shellHook` inside `flake.nix`
      - run: pnpm build
```

This means fewer point of failure and human error.


## Simpler project setup
Since package installation is integrated in `flake.nix`, developers only need to run `nix develop` 
instead of `nix develop && pnpm install`.

### Before
```
// dev-setup-guide.txt
nix develop # runs `shellHook` inside `flake.nix`
pnpm install
pnpm build
```

### After
```
// dev-setup-guide.txt
nix develop # runs `shellHook` inside `flake.nix`
pnpm build
```

## Auto install packages on dependency update
When integrated with [direnv](https://direnv.net/),
we can automalically rerun `shellHook` each time developers enter project directory.
It means developers doesn't have to run `pnpm install` every time dependencies in `package.json` updated.

### Before
```sh
# dependencies updated
nix develop
pnpm install # installs updated dependencies
pnpm build
```

### After
```sh
# dependencies updated
nix develop # installs updated dependencies
pnpm build
```

## Automatically install for subdirectories

No more `cd`-ing for each subdirectories.

### Before
```bash
nix develop
pnpm install

cd repo-root/packages/foo
pnpm install

cd repo-root/packages/bar
pnpm install
```

### After
```bash
nix develop
```

# Solution

Since all my projects uses [`flake.nix`](https://nixos.wiki/wiki/Flakes), 
I could just add the installation script to `shellHook`. 

```nix
# flake.nix
{
  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux; {
    devShell.x86_64-linux = mkShellNoCC {
      shellHook = # run something here;
    };
  };
}
```

## Solution 1: `pnpm install --recursive`

We can run `pnpm install` for all subdirectories with `--recursive flag`.

```nix
# flake.nix
{
  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux; {
    devShell.x86_64-linux = mkShellNoCC {
      shellHook = ''
        pnpm install --recursive
      '';
    };
  };
}
```

However the installation was slow. 
It was running `pnpm install` on packages in `node_modules`.

```
node_modules/.pnpm/deasync@0.1.28/node_modules/deasync: Running install script, done in 223ms
node_modules/.pnpm/puppeteer@9.1.1/node_modules/puppeteer: Running install script, done in 137ms
node_modules/.pnpm/sharp@0.30.7/node_modules/sharp: Running install script, done in 368ms
node_modules/.pnpm/sharp@0.31.3/node_modules/sharp: Running install script, done in 377ms
node_modules/.pnpm/es5-ext@0.10.62/node_modules/es5-ext: Running postinstall script, done in 72ms
```

## Solution 2: Manually find and iterate

Instead of using `--recursive` flag, I used classic bash `for` loop to iterate over all tracked `pnpm-lock.yaml`
and run `pnpm install` over it. This way, install script won't run on git ignored dirs such as `node_modules`.

Tracked `pnpm-lock.yaml` files was listed by simply `grep`-ing outputs of `git ls-files`.

The flag `--dir <dirname>` was used on `pnpm install` to specify which directory to run the command.
This eliminates the need of `cd`-ing to the directories.

```bash
for npm_dir in $(git ls-files | grep pnpm-lock.yaml); do pnpm install --dir $(dirname "$npm_dir"); done
```

Finally, I want the `shellHook` to fail with exit code 1 when the installation fail. 
So I appended `|| exit 1` after the script.

```bash
for npm_dir in $(git ls-files | grep pnpm-lock.yaml); do pnpm install --dir $(dirname "$npm_dir"); done || exit 1
```

Add the script to `flake.nix`

```nix
# flake.nix
{
  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux; {
    devShell.x86_64-linux = mkShellNoCC {
      shellHook = ''
        for npm_dir in $(git ls-files | grep pnpm-lock.yaml); do pnpm install --dir $(dirname "$npm_dir"); done || exit 1
      '';
    };
  };
}
```

# Conclusion

Congrats! No more documents for project setup!
