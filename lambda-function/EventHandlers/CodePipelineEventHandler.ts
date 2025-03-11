import { EventBridgeEvent } from "aws-lambda";
import { EmailNotifier } from "../notifications/EmailNotifier";
import { DefaultEventHandler } from "./DefaultEventHandler";

export enum DetailTypes {
  "CodePipeline Pipeline Execution State Change",
  "CodePipeline Stage Execution State Change",
  "CodePipeline Action Execution State Change",
}
export interface Detail {
  "pipeline": string;
  "execution-id": string;
  "start-time": string;
  "execution-trigger": {
    "trigger-type": string;
    "trigger-detail": string;
  };
  "state": string;
  "version": number;
  "pipeline-execution-attempt": number;
}
export class CodePipelinePipelineExecutionStateChange extends DefaultEventHandler<keyof DetailTypes, Detail> { }
export class CodePipelineStageExecutionStateChange extends DefaultEventHandler<keyof DetailTypes, Detail> { }
export class CodePipelineActionExecutionStateChange extends DefaultEventHandler<keyof DetailTypes, Detail> { }
