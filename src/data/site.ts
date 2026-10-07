export const SITE = {
  name: 'PowerGlide',
  tagline: 'Premier Auto Service Center',

  phones: [
    { label: 'Mobile', display: '+233 24 298 1276', tel: '+233242981276' },
    { label: 'Landline', display: '+233 30 290 1139', tel: '+233302901139' },
    { label: 'Parts orders', display: '+233 20 727 5107', tel: '+233207275107' },
  ],
  
  phone: '+233 24 298 1276',

  email: 'pglideautos@yahoo.com',

  whatsapp: '233207275107',

  hours: [
    { days: 'Monday – Friday', time: '8:00 am – 6:00 pm' },
    { days: 'Saturday', time: '8:00 am – 4:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],

  accreditation: {
    badge: 'ATRA Member - UK',
    title: 'Approved specialist automatic transmission refurbishment center',
    text: 'Diagnosing with the latest software and technology.',
  },
} as const;

export interface NavItem { label: string; to: string }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Auto Parts', to: '/parts' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];
