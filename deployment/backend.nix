
with import <nixpkgs> {};
{ pkgs? import <nixpkgs>, ... }:
stdenv.mkDerivation rec {
  name         = "parachaintracker-api-${version}";
  version      = "1.0.0";
  src          = ./..;
  buildInputs  = [ nodejs-10_x ];
  preBuild =
  ''
  '';
  installPhase =
  ''
    export HOME=""
    mkdir -p $out/bin
    rm -rf node_modules/ dist/
    cp -r . $out/lib/
    cp -r ./.bin $out/lib/
    cp ./deployment/backend_script.sh $out/bin/run
    chmod +x $out/bin/*
  '';
}
