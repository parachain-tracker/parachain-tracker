{ accessKeyId ? "default", region ? "ap-northeast-1", ...}:
{
  resources.snsTopics.send_email = {
    displayName = "send email";
    subscriptions = [
    {
      protocol = "email";
      endpoint = "alerts-parachaintracker.com@kalium.xyz";
    }
    ];
    inherit region accessKeyId;
  };

  resources.cloudwatchMetricAlarms.service_down =
    { resources, ... }:
    { metricName              = "StatusCheckFailed";
      namespace               = "AWS/EC2";
      statistic               = "Maximum";
      dimensions              = [
        {
          Name = "InstanceId";
          Value = resources.machines.machine;
        }
      ];
      unit                    = "Count";
      period                  = 300;
      evaluationPeriods       = 2;
      threshold               = 1;
      comparisonOperator      = "GreaterThanOrEqualToThreshold";
      datapointsToAlarm       = 1;
      alarmActions            = [ resources.snsTopics.send_email ];
      insufficientDataActions = [ resources.snsTopics.send_email ];

      inherit region accessKeyId;
    };
}
