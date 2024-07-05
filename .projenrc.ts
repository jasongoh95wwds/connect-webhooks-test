import { awscdk, javascript } from 'projen';
import { ArrowParens, TrailingComma } from 'projen/lib/javascript/prettier';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'connect-webhooks-test',
  authorName: 'WoodWing Software BV',
  authorUrl: 'https://www.woodwing.com/',
  authorOrganization: true,
  licensed: false,
  packageManager: javascript.NodePackageManager.NPM,
  prettier: true,
  prettierOptions: {
    settings: {
      tabWidth: 2,
      printWidth: 120,
      singleQuote: true,
      arrowParens: ArrowParens.ALWAYS,
      trailingComma: TrailingComma.ALL,
    },
  },
  projenrcTs: true,
  typescriptVersion: '5.3.3',
  mergify: false,
  deps: ['@aws-sdk/client-sqs', '@types/aws-lambda', 'node-fetch', 'cdk-nag'],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

// Remove the existing deploy task
project.removeTask('deploy');

// Add the deploy task with the desired properties
project.addTask('deploy', {
  exec: 'cdk deploy --all',
  receiveArgs: true,
  description: 'Deploys your CDK app to the AWS cloud',
});

// Remove the existing destroy task
project.removeTask('destroy');

// Add the destroy task with the desired properties
project.addTask('destroy', {
  exec: 'cdk destroy --all',
  receiveArgs: true,
  description: 'Destroys your CDK app in the AWS cloud',
});

project.synth();