#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsNotifyEventStack } from '../lib/AwsNotifyEventStack';

const app = new cdk.App();
new AwsNotifyEventStack(app, 'AwsNotifyEvents', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});