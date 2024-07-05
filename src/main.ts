import { App } from 'aws-cdk-lib';
import { ConnectWebhooksTestingPipelineStack } from './lib/connect-webhooks-testing-pipeline-stack';

void (async () => {
  const app = new App();
  new ConnectWebhooksTestingPipelineStack(app, 'ConnectWebhooksTestingPipelineStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
  app.synth();
})();