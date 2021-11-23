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
};
