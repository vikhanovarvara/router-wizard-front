import { Notification, NotificationType } from 'types/common/notification';

export enum EventTypes {
  notification = 'notification',
  removeNotification = 'removeNotification',
}

type EventArguments = {
  [EventTypes.notification]: Notification;
  [EventTypes.removeNotification]: string;
};

type EventListenerCallback<T extends EventTypes> = (payload: EventArguments[T]) => void;

type NotificationOptions = Omit<Notification, 'message'>;

const listeners: Record<EventTypes, EventListenerCallback<EventTypes>[]> = {
  [EventTypes.notification]: [],
  [EventTypes.removeNotification]: [],
};

class EventBus {
  listeners = listeners;

  emit<K extends EventTypes>(key: K, payload: EventArguments[K]) {
    this.listeners[key].forEach(callback => callback(payload));
  }

  on<K extends EventTypes>(key: K, callback: EventListenerCallback<K>) {
    this.listeners[key].push(callback as EventListenerCallback<EventTypes>);
  }

  off<K extends EventTypes>(key: K, callback: EventListenerCallback<K>) {
    const index = this.listeners[key].indexOf(callback as EventListenerCallback<EventTypes>);
    if (index === -1) {
      return;
    }

    this.listeners[key].splice(index, 1);
  }
}

export const eventBus = new EventBus();

export const dispatchNotification = (message: Notification['message'], options: Partial<NotificationOptions> = {}) => {
  options.type ??= NotificationType.SUCCESS;
  eventBus.emit(EventTypes.notification, {
    message,
    ...(options as NotificationOptions),
  });
};
