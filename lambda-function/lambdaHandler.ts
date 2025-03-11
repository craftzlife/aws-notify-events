import { EventBridgeEvent } from "aws-lambda";
import { EventHandlerFactory } from "./LogHandlerFactory";

export async function handler(event: EventBridgeEvent<string, any>) {
  try {
    const detailType: string = event["detail-type"]; // Use event's detail-type to determine the handlers
    const handler = EventHandlerFactory.getHandler(detailType);

    await handler.handle(event);

  } catch (error) {
    console.error(error);
  }
}
