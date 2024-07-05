import * as cdk from 'aws-cdk-lib';
import { SlackChannelConfiguration } from 'aws-cdk-lib/aws-chatbot';
import { NotificationRule } from 'aws-cdk-lib/aws-codestarnotifications';
import { Topic } from 'aws-cdk-lib/aws-sns';
// import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import { ConnectWebhooksStage } from './connect-webhooks-stage';
import * as config from '../config/config.json';

export class ConnectWebhooksTestingPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'WoodWing-Connect-Webhooks-Testing-Pipeline',
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(config.gitHub.repo, config.gitHub.branch, {
          connectionArn: config.gitHub.connection,
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    // if (config.environments.dev) {
    //   pipeline.addStage(
    //     new ConnectWebhooksStage(this, config.environments.dev.name, {
    //       env: config.environments.dev.env,
    //     }),
    //   );
    // }

    // const testStage = pipeline.addStage(
    //   new ConnectWebhooksStage(this, config.environments.test.name, {
    //     env: config.environments.test.env,
    //   }),
    // );
    // testStage.addPost(
    //   new ShellStep('Run Integration Tests', {
    //     commands: ['npm install', 'npm test'],
    //   }),
    // );

    // const productionWave = pipeline.addWave('Production');
    // productionWave.addPre(new ManualApprovalStep('Manual approval before production'));
    // config.environments.productions.forEach((production: any) => {
    //   productionWave.addStage(
    //     new ConnectWebhooksStage(this, production.name, {
    //       env: production.env,
    //     }),
    //   );
    // });
    pipeline.buildPipeline();
    this.addNotifications(pipeline);
  }

  private addNotifications(pipeline: CodePipeline) {
    const topic = new Topic(this, 'ConnectWebhooksPipelineNotifications');
    // const slack = new SlackChannelConfiguration(this, 'ChatBotSlackChannel', {
    //   slackChannelConfigurationName: 'Connect-Webhooks-Notifications',
    //   slackWorkspaceId: config.slack.workspaceId,
    //   slackChannelId: config.slack.channelId,
    // });
    const slack = SlackChannelConfiguration.fromSlackChannelConfigurationArn(this, 'ChatBotSlackChannel',
        'arn:aws:chatbot::009852160363:chat-configuration/slack-channel/Connect-Webhooks-Notifications'
    );
    const rule = new NotificationRule(this, 'ConnectWebhooksPipelineNotificationRule', {
      source: pipeline.pipeline,
      events: [
        'codepipeline-pipeline-pipeline-execution-started',
        'codepipeline-pipeline-pipeline-execution-canceled',
        'codepipeline-pipeline-pipeline-execution-failed',
        'codepipeline-pipeline-pipeline-execution-succeeded',
        'codepipeline-pipeline-manual-approval-needed',
      ],
      targets: [topic],
    });
    rule.addTarget(slack);
  }
}