# WoodWing Connect Webhooks

This AWS CDK app manages and deploy the resouces required by webhook integration between webhook producer and WoodWing Connect Webhooks service.

## Description

This stack retrieves all the current configuration to use for deployment.

## Configuration

All configuration is located in the `src/config` folder.

- `accounts.ts` configures AWS account to grant permission of action sendMessage to the SQS queue,
- `config.json` configures CDK required options such as environment, url and etc.

## Build With

### Projen

Projen (https://github.com/projen/projen) is used for the project management.

### Node

Node 18 is used for development.

### ESlint
ESlint is enabled and run during test.

### Prettier
Prettier formatter is enabled and run during test.

### AWS CDK
AWS CDK is used for defining cloud infrastructure and deploying it through AWS CloudFormation.

### cdk-nag
Check CDK applications or CloudFormation templates for best practices using a combination of available rule packs.

### Typescript
Use typescript as the main language for CDK and as well as lambda function.

## Development

### Setup
Run projen to synthesize the project to generate all the files.
```bash
npx projen
```

If any changes in the .projecrc.ts file, run projen again to generate latest files.
```bash
npx projen
```

### Testing

Run test command, to test the CDK infrasture with linting and prettier formatting.
```bash
npx projen test
```

## Deployment

You need to have access to the `connect-development`/`woodwing-connect` account to deploy this stack to the development/production environment.

### Deploy

```bash
npx projen deploy
```

### Destroy

```bash
npx projen destroy
```
