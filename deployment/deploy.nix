let
  aws         = import ./ec2-info.nix;
  region      = aws.region;
  accessKeyId = aws.accessKeyId;
in
{
  require = [ ./machine.nix ./cloudwatch.nix ];
  machine =
    { pkgs, resources, ... }:
    {
      deployment = {
        targetEnv = "ec2";
        ec2       = {
          accessKeyId            = accessKeyId;
          region                 = region;
          instanceType           = "t2.nano";
          keyPair                = "nixops";
          elasticIPv4            = resources.elasticIPs.ip;
          ebsInitialRootDiskSize = 8;
          securityGroups         = [
            "default"
            resources.ec2SecurityGroups.http
            resources.ec2SecurityGroups.ssh-all
          ];
        };
        owners = [ "martijn.becker@adamant.dev" ];
      };

      networking.firewall.allowedTCPPorts = [ 80 443 ];

      services.nginx = {
        enable = true;

        # Use recommended settings
        recommendedGzipSettings  = true;
        recommendedOptimisation  = true;
        recommendedProxySettings = true;
        recommendedTlsSettings   = true;

        virtualHosts = {
          "www.parachaintracker.com" = {
            forceSSL = true;
            enableACME = true;
          };
          "parachaintracker.com" = {
            forceSSL = true;
            enableACME = true;
          };
        };
      };

      security.acme.certs = {
        "www.parachaintracker.com" = {
          email = "cert-parachaintracker.com@kalium.xyz";
        };
        "parachaintracker.com" = {
          email = "cert-parachaintracker.com@kalium.xyz";
        };
      };
    };

  resources.ec2SecurityGroups.http = {
    inherit accessKeyId region;
    rules = [ {
      fromPort = 80;
      toPort = 80;
      sourceIp = "0.0.0.0/0";
    }
    {
      fromPort = 443;
      toPort = 443;
      sourceIp = "0.0.0.0/0";
    } ];
  };

  resources.ec2SecurityGroups.ssh-all = {
    inherit accessKeyId region;
    rules = [ {
      fromPort = 22;
      toPort = 22;
      sourceIp = "0.0.0.0/0";
    } ];
  };

  resources.elasticIPs.ip = {
    inherit accessKeyId region;
  };

  resources.route53RecordSets = {
    www-record = { resources, ... }: {
      inherit accessKeyId region;
      zoneId = "Z35ZIFAN6FBVUB";
      domainName = "www.parachaintracker.com.";
      ttl = 300;
      recordValues = [ resources.machines.machine ];
      recordType = "A";
    };
    root-record = { resources, ... }: {
      inherit accessKeyId region;
      zoneId = "Z35ZIFAN6FBVUB";
      domainName = "parachaintracker.com.";
      ttl = 300;
      recordValues = [ resources.machines.machine ];
      recordType = "A";
    };
  };
}
