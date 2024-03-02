import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const [api, contextHolder] = notification.useNotification();

export const openNotificationWithIcon = (
  type: NotificationType,
  title = '',
  desc = ''
) => {
  api[type]({
    message: title,
    description: desc,
  });
};
