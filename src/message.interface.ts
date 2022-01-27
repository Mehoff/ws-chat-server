interface Message {
  action: "ECHO" | "PING";
  data?: string;
}
