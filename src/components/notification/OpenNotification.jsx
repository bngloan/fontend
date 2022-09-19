import { notification } from "antd";

const OpenNotification = ({ message, type }) =>
  notification[
    type === 1
      ? "success"
      : type === 2
      ? "info"
      : type === 3
      ? "warning"
      : "error"
  ]({
    message: message,
    description: "",
    duration:3
  });
export default OpenNotification;
