import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ConnectWebhooksTestingPipelineStack } from '../src/lib/connect-webhooks-testing-pipeline-stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new ConnectWebhooksTestingPipelineStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
