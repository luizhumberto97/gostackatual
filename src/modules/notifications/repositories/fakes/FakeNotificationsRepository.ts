import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

// SOLID

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    // Agora vamos fazer duas operações -> criar um agendamento e salvar no banco
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });
    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
