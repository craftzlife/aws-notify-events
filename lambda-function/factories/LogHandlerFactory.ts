import { EC2EventHandler } from "../handlers/EC2EventHandler";
import { CodePipelineEventHandler } from "../handlers/CodePipelineEventHandler";
import { EventHandler } from "../handlers/EventHandler";
enum EventSources {
  'aws.ec2',
  'aws.codepipeline',
}

export class EventHandlerFactory {
  static create(service: EventSources): EventHandler<string, any> {
    switch (service) {
      case EventSources['aws.ec2']:
        return new EC2EventHandler();
      case EventSources['aws.codepipeline']:
        return new CodePipelineEventHandler();
      default:
        return null;
    }
  }
}
