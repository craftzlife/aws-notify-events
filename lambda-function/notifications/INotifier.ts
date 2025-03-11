export interface INotifier {
  profile?: string;
  send(message: string): void;
}