import { EventBridgeEvent } from 'aws-lambda';
import { INotifier } from '../notifications/INotifier';

export class DefaultEventHandler<TDetailType extends string, TDetail> {
    protected notifiers: INotifier[] = [];
    public async handle(event: EventBridgeEvent<TDetailType, TDetail>) {
        console.info('Handling event:', event);
        // console.info('Event details:', event.detail);
        
        await Promise.all(this.notifiers.map(notifier => notifier.send(`${event.source} alert: ${event['detail-type']} is ${event.detail}`)));
    }
}