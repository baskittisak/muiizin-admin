import notification from "antd/lib/notification";

export const getNotification = ({ type, message, description }) => {
  notification[type]({
    message,
    description,
    duration: 2,
  });
};
