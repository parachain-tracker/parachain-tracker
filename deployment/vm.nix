{
  network.description = "staging";
  require = [ ./machine.nix ];
  machine =
    { resources, ... }:
    {
      deployment.targetEnv = "virtualbox";
      deployment.virtualbox.memorySize = 1024; # megabytes
      deployment.virtualbox.vcpu = 2; # number of cpus
      deployment.virtualbox.headless = true;
    };
}
