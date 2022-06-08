import notification from "antd/lib/notification";

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const getNotification = ({ type, message, description }) => {
  notification[type]({
    message,
    description,
    duration: 2,
  });
};
