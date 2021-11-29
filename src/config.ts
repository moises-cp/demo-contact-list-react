export const fieldsConfig = {
  email: {
    hasError: false,
    msg: [
      '- Please use the format: username@company.com.',
      '- Must be unique.',
      '- Characters Allowed: letters, numbers, periods, hyphens, underscores and @ symbol.',
      '- Username must have between 2 to 40 characters.',
      '- Company name must have between 2 to 20 characters.',
    ],
    name: 'email',
    regex: /^[a-zA-Z0-9.-_]{2,40}@[a-zA-Z0-9-.]{2,20}\.[a-zA-Z]{2,4}$/,
    type: 'array',
  },
  firstName: {
    hasError: true,
    msg: [
      '- Please enter your first name.',
      '- Only letters are allowed.',
      '- 2-40 Characers limit.',
      '- Special characters and spaces are not allowed.',
    ],
    name: 'firstName',
    regex: /^[a-zA-Z-'áéíóúñüÁÉÍÓÚÑÜ]{2,40}$/,
    type: 'string',
  },
  lastName: {
    hasError: true,
    msg: [
      '- Please enter your last name.',
      '- Only letters, apostrophe, and spaces are allowed.',
      '- 2-40 characters limit.',
    ],
    name: 'lastName',
    regex: /^[a-zA-Z- 'áéíóúñüÁÉÍÓÚÑÜ]{2,40}$/,
    type: 'string',
  },
}

export const socialIcon = {
  email: 'icon-email-v5.jpg',
  facebook: 'logo-facebook-f_logo_RGB-Blue_58.png',
  github: 'logo-GitHub-Mark-32px.png',
  linkedin: 'logo-linkedin-In-Blue-40.png',
  phone: 'icon-phone-v1.jpg',
  twitter: 'logo-Twitter-social-icons-circle-blue.svg',
  website: '',
  youtube: 'logo-youtube_social_icon_red.png',
}
