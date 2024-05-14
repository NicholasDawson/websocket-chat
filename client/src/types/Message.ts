export class Message {
  constructor(
    public fromName: string,
    public timeSent: Date,
    public wasSent: boolean,
    public text: string
  ) {}
}
