interface Url {
  emailPrimary?: string
  facebook?: string
  instagram?: string
  github?: string
  linkedin?: string
  phonePrimary?: string
  spotify?: string
  tiktok?: string
  twitter?: string
  yelp?: string
  youtube?: string
  website?: string
}

export interface Contact {
  id: number
  firstName: string
  lastName: string
  emails: string[]
  profileImage?: string
  url: Url
}

export type ContactList = Contact[]

export interface NotificationType {
  id: number
  message: string
}
