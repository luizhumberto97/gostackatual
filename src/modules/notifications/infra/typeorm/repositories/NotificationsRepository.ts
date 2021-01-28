import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

// SOLID

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo'); // Sempre pega o nome da conexão
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    // Agora vamos fazer duas operações -> criar um agendamento e salvar no banco
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    // salvar no banco
    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
