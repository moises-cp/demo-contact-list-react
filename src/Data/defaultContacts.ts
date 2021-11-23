import { ContactList } from '../types';
import { getUniqueId } from '../util';

export const defaultContactList: ContactList = [
  {
    id: getUniqueId(),
    firstName: 'Jennifer',
    lastName: 'Lopez',
    emails: ['jennifer@jlo.com', 'lopez2@jlo2.com'],
    profileImage: 'pexels-jorge-fakhouri-filho-2616958-orig (2).jpg',
  },
  {
    id: getUniqueId(),
    firstName: 'Denise',
    lastName: 'Quiñones',
    emails: ['denise@quinones.net'],
    profileImage: 'pexels-redwolf-7439890-orig (2).jpg',
  },
  {
    id: getUniqueId(),
    firstName: 'Joaquin',
    lastName: 'Phoenix',
    emails: [
      'joaquin1@phoenix1.edu',
      'joaquin2@phoenix2.co',
      'joaquin3@phoenix3.xyz',
      'joaquin4@phoenix4.com',
      'joaquin5@phoenix5.mob',
    ],
    profileImage: 'person-profile-pexels-jorge-fakhouri-filho-2616958.jpg',
  },
  {
    id: getUniqueId(),
    firstName: 'Benicio',
    lastName: 'Del Toro',
    emails: [
      'deltoro1@Benicio1.pr',
      'deltoro2@Benicio2.co',
      'deltoro3@Benicio3.com',
    ],
    profileImage: 'pexels-victor-l-2790437 (2).jpg',
  },
  {
    id: getUniqueId(),
    firstName: 'Rosario',
    lastName: 'Dawson',
    emails: [
      'dawson@rosario.com',
      'dawson2@rosario2.com',
      'dawson3@rosario3.com',
    ],
    profileImage: 'pexels-marcelo-chagas-3442135 (2).jpg',
  },
  {
    id: getUniqueId(),
    firstName: 'Luis',
    lastName: 'Gúzman',
    emails: [
      'guz@luis.com',
      'guzman2@luis2.com',
      'man3@luis3.com',
      'gman4@luis4.com',
      'guzman@luis5.com',
    ],
    profileImage: 'pexels-lucxama-sylvain-2766224 (2).jpg',
  },
];
