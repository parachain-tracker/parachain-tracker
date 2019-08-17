with import <nixpkgs> {};
{ pkgs, ... }:
stdenv.mkDerivation rec {
  name         = "parachaintracker.com-${version}";
  version      = "1.0.0";
  src          = ./..;
  buildInputs  = [ nodejs-10_x ];
  installPhase =
  ''
    if [ ! -d ./dist/apps/parachain-tracker/ ]; then
      echo "run npm run build:client firsr"
      exit 1
    fi
    mkdir -p $out/website
    cp -r ./dist/apps/parachain-tracker/* $out/website/
  '';
}
