import { INotifier } from "./INotifier";

export interface LineWorksMessage {
  message: string;
}
export class LineWorksNotifier implements INotifier {
  async send(message: string) {
    console.log(`Sending LineWorks Notification: ${message}`);
    throw new Error("Not implemented");
    // Integrate with AWS SES or another email service here
  }
}
