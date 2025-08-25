# AWS Notify Events

An AWS serverless solution that monitors AWS service events and sends notifications through multiple channels including email and LineWorks.

## Architecture

- **AWS Lambda**: Event processing and notification handling
- **Amazon EventBridge**: Event routing from AWS services
- **AWS CDK**: Infrastructure as Code deployment
- **DynamoDB**: Source information storage
- **SES**: Email notifications

## Features

- Monitor CodePipeline pipeline, stage, and action state changes
- Monitor EC2 instance state changes
- Send notifications via:
  - Email (AWS SES)
  - LineWorks
- Extensible event handler architecture
- Configurable notification channels

## Project Structure

```
├── aws-cdk/                    # CDK infrastructure code
│   ├── bin/                    # CDK app entry points
│   ├── lib/                    # Stack definitions
│   └── test/                   # CDK tests
└── lambda-function/            # Lambda function code
    ├── EventHandlers/          # Event-specific handlers
    ├── notifications/          # Notification providers
    └── lambdaHandler.ts        # Main Lambda handler
```

## Prerequisites

- Node.js 22.x
- AWS CLI configured
- AWS CDK CLI installed

## Setup

1. **Install dependencies**:
   ```bash
   # CDK dependencies
   cd aws-cdk
   npm install
   
   # Lambda dependencies
   cd ../lambda-function
   npm install
   ```

2. **Configure environment**:
   - Update `aws-cdk/bin/app-configs.ts` with your DynamoDB table ARN
   - Configure notification settings in the Lambda environment variables

3. **Deploy infrastructure**:
   ```bash
   cd aws-cdk
   npm run build
   npx cdk deploy
   ```

## Configuration

The system monitors the following AWS events:
- CodePipeline Pipeline Execution State Change
- CodePipeline Action Execution State Change  
- CodePipeline Stage Execution State Change
- EC2 Instance State-change Notification

## Development

**Build**:
```bash
# CDK
cd aws-cdk && npm run build

# Lambda
cd lambda-function && npm run build
```

**Test**:
```bash
cd aws-cdk && npm test
```