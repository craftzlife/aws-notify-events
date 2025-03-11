import { INotifier } from "./INotifier";
import { SESClient, SESClientConfig } from '@aws-sdk/client-ses';
export class EmailNotifier implements INotifier {
  private sesClient: SESClient;
  constructor() {
    this.sesClient = new SESClient();
  }

  async send(message: string) {
    console.log(`Sending Email Notification: ${message}`);
    // Integrate with AWS SES or another email service here
    throw new Error("Not implemented");
  }
}
