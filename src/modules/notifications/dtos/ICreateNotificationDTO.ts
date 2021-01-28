// Para criar uma notificação, vamos precisar do conteúdo dela e o recipiente
export default interface ICreateNotificationDTO {
  content: string;
  recipient_id: string;
}
