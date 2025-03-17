interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

interface AnalyticsEvent {
  page_view: string;
  form_start: string;
  form_submit: string;
  form_error: string;
  referral_click: string;
  referral_submit: string;
  membership_download: string;
  social_share: string;
  button_click: string;
}

interface AnalyticsEventCategory {
  ENGAGEMENT: 'engagement';
  FORM: 'form';
  REFERRAL: 'referral';
  MEMBERSHIP: 'membership';
  SOCIAL: 'social';
}
