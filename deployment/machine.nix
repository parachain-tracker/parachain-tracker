{
  machine =
    { pkgs, resources, ... }:
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
      nix.gc.automatic = true;

      services.nginx = {
        enable = true;

        # Use recommended settings
        recommendedGzipSettings  = true;
        recommendedOptimisation  = true;
        recommendedProxySettings = true;

        virtualHosts = {
          "www.parachaintracker.com" = {
            locations."/".proxyPass = "http://localhost:4000/";
          };
          "parachaintracker.com" = {
            locations."/".proxyPass = "http://localhost:4000/";
          };
        };
      };

      networking.firewall.allowedTCPPorts = [ 80 ];
    };
}
