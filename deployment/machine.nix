{
  machine =
    { pkgs, resources, ... }:
    let
      frontend = import ./frontend.nix { inherit pkgs; };
    in
      {
    require = [ ./backend.nix ];

    # users.mutableUsers = false;
    # without mutable users we will have to supply ssh keys

    users.groups.worker.gid = 1000;
    users.users.worker = {
      isNormalUser = false;
      extraGroups = ["worker"];
      home = "/app";
      packages = with pkgs; [
        nodejs-10_x
      ];
    };

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
          locations."/" =  {
            tryFiles = "$uri $uri/ /index.html";
          };
        };
        "parachaintracker.com" = {
          root = "${frontend}/website";
          locations."/api".proxyPass = "http://localhost:3333/api";
          locations."/" =  {
            tryFiles = "$uri $uri/ /index.html";
          };
        };
      };
    };

    networking.firewall.allowedTCPPorts = [ 80 ];
  };
}
