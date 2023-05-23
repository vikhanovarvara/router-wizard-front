import React, { useEffect } from 'react';
import { ToastOptions, toast } from 'react-toastify';

import { EventTypes, eventBus } from 'shared/packages/EventBus';
import { Typography } from 'shared/ui/typography/Typography';

import { Notification, NotificationType } from 'types/common/notification';

import sx from './Notifications.styles';

const baseNotification: ToastOptions = {
  theme: 'light',
  autoClose: 7000,
  style: {
    maxWidth: '500px',
    width: '100%',
  },
};

const notificationTitleByType: Readonly<Record<NotificationType, string>> = {
  error: 'Произошла ошибка!',
  success: 'Успешно!',
  info: 'Внимание!',
  warning: 'Внимание!',
};

export function Notifications() {
  useEffect(() => {
    function toastNotify(res: Notification) {
      const message = (
        <>
          {res.title && <Typography sx={sx.title}>{res.title}</Typography>}
          {res.message && (
            <Typography variant='body1' sx={sx.message}>
              {res.message}
            </Typography>
          )}
        </>
      );
      toast(res?.message ? message : notificationTitleByType[res.type], {
        ...baseNotification,
        ...res,
        type: res.type,
      });
    }

    const dismissNotify = (id?: number | string) => {
      if (id) toast.dismiss(id);
    };

    eventBus.on(EventTypes.notification, toastNotify);
    eventBus.on(EventTypes.removeNotification, dismissNotify);

    return () => {
      eventBus.off(EventTypes.notification, toastNotify);
      eventBus.off(EventTypes.removeNotification, dismissNotify);
    };
  }, []);

  return null;
}

export default Notifications;
