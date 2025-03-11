import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');
import * as configs from '../bin/app-configs';

export class AwsNotifyEventStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iamRole = new cdk.aws_iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'Lambda Execution Role',
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLambdaInsightsExecutionRolePolicy'),
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
      ]
    });

    const sourceInfoTable = cdk.aws_dynamodb.Table.fromTableArn(this, 'SourceInfoTable', configs.sourceInfoTable);
    const lambda = new cdk.aws_lambda.Function(this, 'LambdaHandler', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_22_X,
      handler: 'dist/lambdaHandler.handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(process.cwd(), '../lambda-function'), {
        bundling: {
          image: cdk.aws_lambda.Runtime.NODEJS_22_X.bundlingImage,
          network: 'host',
          user: 'root',
          command: [
            'bash', '-c', [
              'npm install --no-audit --no-fund',
              'npm run build',
              'npm prune --production',
              'rm -rf /asset-output/*',
              'cp -r dist node_modules /asset-output',
            ].join(' && ')
          ],
          bundlingFileAccess: cdk.BundlingFileAccess.VOLUME_COPY,
          outputType: cdk.BundlingOutput.NOT_ARCHIVED,
        }
      }),
      role: iamRole,
      description: 'From CodePipeline Events, notify to users via LineWorks, Email,...',
      timeout: cdk.Duration.seconds(60),
      tracing: cdk.aws_lambda.Tracing.ACTIVE,
      architecture: cdk.aws_lambda.Architecture.ARM_64,
      memorySize: 128,
      environment: {
        'DYNAMODB_BACKLOG_WEBHOOK_TABLE_NAME': sourceInfoTable.tableName,
      },
      retryAttempts: 2,
      logGroup: new cdk.aws_logs.LogGroup(this, 'LambdaHandlerLogGroup', {
        logGroupName: '/aws/lambda/codepipeline-event-notify',
        retention: cdk.aws_logs.RetentionDays.ONE_MONTH,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        logGroupClass: cdk.aws_logs.LogGroupClass.STANDARD
      })
    });

    // const event = new cdk.aws_events.Rule(this, 'EventRule', {
    //   eventPattern: {
    //     source: [
    //       'aws.codepipeline'
    //     ],
    //     detailType: [
    //       'CodePipeline Pipeline Execution State Change',
    //       'CodePipeline Action Execution State Change',
    //       'CodePipeline Stage Execution State Change',
    //     ],
    //     detail: {
    //       state: ['CANCELED', 'FAILED', 'RESUMED', 'STARTED', 'STOPPED', 'SUCCEEDED', 'SUPERSEDED']
    //     },
    //   },
    //   enabled: true,
    //   targets: [
    //     new cdk.aws_events_targets.LambdaFunction(lambda)
    //   ]
    // });

    // Monitor events from CodePipeline and EC2 services
    const event = new cdk.aws_events.Rule(this, 'EventRule', {
      eventPattern: {
        source: [
          'aws.codepipeline',
          'aws.ec2'
        ],
        detailType: [
          'CodePipeline Pipeline Execution State Change',
          'CodePipeline Action Execution State Change',
          'CodePipeline Stage Execution State Change',
          'EC2 Instance State-change Notification'
        ],
      },
      enabled: true,
      targets: [
        new cdk.aws_events_targets.LambdaFunction(lambda)
      ]
    });
  }
}
