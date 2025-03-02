import { INotifier } from "./INotifier";

export class EmailNotifier implements INotifier {
  async send(message: string) {
    console.log(`Sending Email Notification: ${message}`);
    // Integrate with AWS SES or another email service here
  }
}
