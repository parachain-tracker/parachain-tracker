with import <nixpkgs> {};
{ pkgs, ... }:
stdenv.mkDerivation rec {
  name         = "parachaintracker.com-${version}";
  version      = "1.0.0";
  src          = ./..;
  buildInputs  = [ nodejs-10_x ];
  preBuild =
  ''
    if [ ! -d node_modules/ ]; then
      exit 1
    fi
    patchShebangs ./node_modules/
  '';
  installPhase =
  ''
    export HOME=""
    npm run build:client
    mkdir -p $out/website
    cp -r ./dist/apps/parachain-tracker/* $out/website/
  '';
}
