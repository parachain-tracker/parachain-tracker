{
  machine =
    { pkgs, resources, ... }:
    let
      backend  = import ./backend.nix  { inherit pkgs; };
      frontend = import ./frontend.nix { inherit pkgs; };
    in
      {

    virtualisation.docker.enable = true;

    environment.systemPackages = [ pkgs.docker ];

    systemd.services.backend-init = {
      wantedBy = [ "multi-user.target" ];
      serviceConfig = {
        path = [ pkgs.docker ];
        Type = "oneshot";
        ExecStart = "${backend}/bin/run ${backend} ${pkgs.docker}/bin/docker";
        User = "root";
      };
    };

    # systemd.services.backend = {
    #   wantedBy = [ "multi-user.target" ];
    #   serviceConfig = {
    #     path = [ pkgs.docker ];
    #     Type = "simple";
    #     Restart = "always";
    #     ExecStart = "${pkgs.docker}/bin/docker start api-container";
    #     User = "root";
    #   };
    # };


    services.nginx = {
      enable = true;

      # Use recommended settings
      recommendedGzipSettings  = true;
      recommendedOptimisation  = true;
      recommendedProxySettings = true;

      virtualHosts = {
        "www.parachaintracker.com" = {
          root = "${frontend}/website";
          locations."/api".proxyPass = "http://localhost:3333/api";
        };
        "parachaintracker.com" = {
          root = "${frontend}/website";
          locations."/api".proxyPass = "http://localhost:3333/api";
        };
      };
    };

    networking.firewall.allowedTCPPorts = [ 80 ];
  };
}
