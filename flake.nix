{
  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux; {
    devShell.x86_64-linux = mkShellNoCC {
      buildInputs = [
        nodejs-18_x
        nodePackages.pnpm
        lychee
      ];
      shellHook = ''
        pnpm install --recursive || exit 1
      '';
    };
  };
}
