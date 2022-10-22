{
  outputs = { self, nixpkgs }: with nixpkgs.legacyPackages.x86_64-linux; {
    devShell.x86_64-linux = mkShell {
      buildInputs = [
        nodejs-18_x
        nodePackages.pnpm
        nodePackages.eslint_d
      ];
    };
  };
}
