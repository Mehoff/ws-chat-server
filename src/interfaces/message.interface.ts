import ACTION from "../enums/actions";

interface Message {
  action: ACTION;
  data?: string;
}

export default Message;
