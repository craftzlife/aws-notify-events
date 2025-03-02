import { EventBridgeEvent } from "aws-lambda";
import { EmailNotifier } from "../notifications/EmailNotifier";
import { EventHandler } from "./EventHandler";

enum DetailTypes {
  'CodePipeline Pipeline Execution State Change',
  'CodePipeline Stage Execution State Change',
  'CodePipeline Action Execution State Change',
}

export class CodePipelineEventHandler<TDetailType extends keyof DetailTypes, TDetail> implements EventHandler<TDetailType, TDetail> {
  private notifier = new EmailNotifier();

  async handle(event: EventBridgeEvent<TDetailType, TDetail>) {
    if (event["detail-type"] === DetailTypes["CodePipeline Action Execution State Change"].toString()) {
      
    }
    console.log("Handling CodePipeline Event:", event);
    await this.notifier.send(`EC2 Alert: ${event.detail}`);
  }
}
