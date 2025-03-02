import { EventBridgeEvent } from 'aws-lambda';
enum EventSources {
    'aws.ec2',
    'aws.codepipeline',
}
export type EventSource = keyof EventSources;
export abstract class EventHandler<TDetailType extends string, TDetail> {
    handle(event: EventBridgeEvent<TDetailType, TDetail>) {
        console.info('Handling event:', event);
    }
}