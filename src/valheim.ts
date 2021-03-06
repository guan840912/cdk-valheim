import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as efs from '@aws-cdk/aws-efs';
import * as logs from '@aws-cdk/aws-logs';
import { CfnOutput, Construct } from '@aws-cdk/core';

export interface ValheimWorldProps {
  readonly vpc?: ec2.IVpc;
  readonly fileSystem?: efs.FileSystem;
  readonly image?: ecs.ContainerImage;
  readonly cpu?: number;
  readonly memoryLimitMiB?: number;
  readonly desiredCount?: number;

  /**
   * https://github.com/lloesche/valheim-server-docker#environment-variables
   */
  readonly environment?: {
    [key: string]: string;
  };
}


export class ValheimWorld extends Construct {
  public service: ecs.FargateService;

  constructor(scope: Construct, id: string, props?: ValheimWorldProps) {
    super(scope, id);

    const vpc = props?.vpc ?? ec2.Vpc.fromLookup(this, 'DefaultVpc', {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, 'ValheimCluster', { vpc });

    // Create the file system
    const fileSystem = props?.fileSystem ?? new efs.FileSystem(this, 'ValheimSaveDataEFS', {
      vpc,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
    });

    const volumeConfig = {
      name: 'valheim-save-data',
      efsVolumeConfiguration: {
        fileSystemId: fileSystem.fileSystemId,
      },
    };

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'ValheimTaskDefinition', {
      family: 'valheim-world',
      volumes: [volumeConfig],
      cpu: props?.cpu ?? 512,
      memoryLimitMiB: props?.memoryLimitMiB ?? 2048,
    });

    const containerDefinition = taskDefinition.addContainer('ValheimContainer', {
      image: props?.image ?? ecs.ContainerImage.fromRegistry('lloesche/valheim-server'),
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'valheim',
        logRetention: logs.RetentionDays.ONE_DAY,
      }),
      environment: props?.environment,
    });
    containerDefinition.addMountPoints(
      {
        containerPath: '/config/',
        sourceVolume: volumeConfig.name,
        readOnly: false,
      },
    );

    this.service = new ecs.FargateService(this, 'ValheimService', {
      cluster,
      platformVersion: ecs.FargatePlatformVersion.VERSION1_4,
      assignPublicIp: true,
      taskDefinition,
      desiredCount: props?.desiredCount ?? 1,
    });

    // Allow TCP 2049 for EFS
    this.service.connections.allowFrom(fileSystem, ec2.Port.tcp(2049));
    this.service.connections.allowTo(fileSystem, ec2.Port.tcp(2049));

    // Allow UDP 2456-2458 for Valheim
    this.service.connections.allowFrom(ec2.Peer.anyIpv4(), ec2.Port.udpRange(2456, 2458));

    new CfnOutput(this, 'ValheimServiceArn', {
      value: this.service.serviceArn,
    });
  }
}
