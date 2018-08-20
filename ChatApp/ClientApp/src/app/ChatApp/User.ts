

export class User {
  public Id;
  public Name: string;
  public Password: string;
  public ConnectionId: string;
  public isConnected: string;
  public countMessages: number = 0;
}
export class Messages {
  public Id;
  public sender: string;
  public recevier: string;
  public message: string;
  public time: Date;
  public IsRead: boolean;
}
