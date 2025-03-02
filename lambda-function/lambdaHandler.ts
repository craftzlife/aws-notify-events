import { EventBridgeEvent } from "aws-lambda";
import { EventHandlerFactory } from "./factories/LogHandlerFactory";

export async function handler(event: EventBridgeEvent<string, any>) {
  const service: string = event.source; // Use event's source to determine the service
  const logHandler = EventHandlerFactory.create(service);

  if (logHandler) {
    await logHandler.handle(event);
  } else {
    console.error("No handler found for service:", service);
  }
}
