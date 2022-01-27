import ACTION from "../enums/actions";

interface Response {
  to: string;
  action: ACTION;
  data?: string;
}

export default Response;
