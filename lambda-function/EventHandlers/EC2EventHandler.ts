import { EmailNotifier } from "../notifications/EmailNotifier";
import { INotifier } from "../notifications/INotifier";
import { DefaultEventHandler } from "./DefaultEventHandler";
import { EventBridgeEvent } from 'aws-lambda';

export enum DetailTypes {
  'EC2 Instance State-change Notification'
}
export interface Detail {
  "instance-id": string,
  "state": string
}
export class EC2InstanceStateChangeNotification extends DefaultEventHandler<keyof DetailTypes, Detail> { }
