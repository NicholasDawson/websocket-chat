export class Message {
  constructor(
    public clientId: string,
    public fromName: string,
    public timeSent: Date,
    public text: string
  ) {}
}
