export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  emails: string[];
  profileImage: string
}

export type ContactList = Contact[];

export interface NotificationType {
  id: number,
  message: string;
}