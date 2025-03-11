import { EC2InstanceStateChangeNotification } from "./EventHandlers/EC2EventHandler";
import { CodePipelinePipelineExecutionStateChange } from "./EventHandlers/CodePipelineEventHandler";
import { DefaultEventHandler } from "./EventHandlers/DefaultEventHandler";
import { DetailTypes as EC2DetailTypes } from "./EventHandlers/EC2EventHandler";
import { DetailTypes as CodePipelineDetailTypes } from "./EventHandlers/CodePipelineEventHandler";

type DetailTypes = EC2DetailTypes | CodePipelineDetailTypes;

const handlers = {
  [EC2DetailTypes["EC2 Instance State-change Notification"].toString()]: () => new EC2InstanceStateChangeNotification(),
  [CodePipelineDetailTypes["CodePipeline Pipeline Execution State Change"].toString()]: () => new CodePipelinePipelineExecutionStateChange()
};

export class EventHandlerFactory {
  static getHandler(detailType: string): DefaultEventHandler<string, any> {
    return handlers[detailType] ? handlers[detailType]() : new DefaultEventHandler();
  }
}
