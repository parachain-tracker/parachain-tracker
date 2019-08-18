{ pkgs? import <nixpkgs>, ... }:
  with pkgs;
  let

    init_script = writeScript "init" ''
      #!${stdenv.shell}
      rm /app -rf
      cp -r ${parachain} /app
      chown -R worker:worker /app
      ln -s ${node_modules}/lib/node_modules /app/node_modules
      touch /app/.done

      exec "$@"
    '';

    run_script = writeScript "run" ''
      #!${stdenv.shell}

      while [ ! -f /app/.done ]; do
        sleep 1;
      done

      exec ${nodejs-10_x}/bin/node /app/local.js

      exec "$@"
    '';

    run_api_script = writeScript "run_api" ''
      #!${stdenv.shell}

      while [ ! -f /app/.done ]; do
        sleep 1;
      done

      exec ${nodejs-10_x}/bin/node /app/dist/apps/api/main.js

      exec "$@"
    '';

    run_sheets_script = writeScript "run_sheets" ''
      #!${stdenv.shell}

      while [ ! -f /app/.done ]; do
        sleep 1;
      done

      exec ${nodejs-10_x}/bin/node /app/dist/apps/api-consumer-producer/main.js

      exec "$@"
    '';
    node_modules = stdenv.mkDerivation rec {
      name         = "node_modules";
      version      = "1.0.0";
      src          = ./..;
      buildInputs  = [ nodejs-10_x ];
      installPhase =
      ''
        if [ ! -d node_modules ]; then
           echo "run npm ci first"
           exit 1
        fi
        mkdir -p $out/lib/
        cp -r node_modules $out/lib/
      '';
    };
    parachain = stdenv.mkDerivation rec {
      name         = "parachaintracker-${version}";
      version      = "1.0.1";
      src          = ./..;
      buildInputs  = [ nodejs-10_x ];
      installPhase =
      ''
        if [ ! -d dist ] || [ ! -d database ]; then
           echo "run npm run build:backend first"
           exit 1
        fi
        if [ ! -f .google_sheets.json ]; then
           echo "you need to include the credentials for the api-consumer-producer, check the readme"
           exit 1
        fi
        mkdir -p $out
        # copy the secrets
        cp ./.google_sheets.json $out/
        cp ./.env $out/
        # copy the config files
        cp ./*.json $out/
        cp ./local.js $out/
        # copy the set up database
        cp -r database $out/
        cp -r ./dist $out/
      '';
    };
  in
  rec {
      systemd.services.backend_init = {
        wantedBy = [ "multi-user.target" ];
        serviceConfig = {
          Type = "oneshot";
          ExecStart = "${init_script}";
        };
      };

      systemd.services.backend-sheets = {
        wantedBy = [ "multi-user.target" ];
        serviceConfig = {
          Type = "simple";
          Restart = "always";
          ExecStart = "${run_sheets_script}";
          WorkingDirectory = "/app";
          User = "root";
        };
      };

      systemd.services.backend-api = {
        wantedBy = [ "multi-user.target" ];
        serviceConfig = {
          Type = "simple";
          Restart = "always";
          ExecStart = "${run_api_script}";
          WorkingDirectory = "/app";
          User = "worker";
        };
      };

      systemd.services.backend = {
        wantedBy = [ "multi-user.target" ];
        serviceConfig = {
          Type = "simple";
          Restart = "always";
          ExecStart = "${run_script}";
          WorkingDirectory = "/app";
          User = "worker";
        };
      };
  }
