export const SITE = {
  name: 'PowerGlide',
  tagline: 'Premier Auto Service Center',

  
  phone: '+233 20 156 7238',
  email: 'powerglide@gmail.com',

  whatsapp: '233201567238',

  
  address: 'Circle, Accra',
  hours: [
    { days: 'Monday – Friday', time: '8:00 am – 6:00 pm' },
    { days: 'Saturday', time: '8:00 am – 4:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],

  
  // mapEmbedUrl: 'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.975391608856!2d-0.22040058988476394!3d5.570656033479758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b4af7071a87%3A0xa6bc1dc10433d155!2sCircle!5e0!3m2!1sen!2sgh!4v1790923994635!5m2!1sen!2sgh"',
} as const;

export interface NavItem { label: string; to: string }


export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Auto Parts', to: '/parts' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];