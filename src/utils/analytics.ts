// Analytics event categories
export const AnalyticsEventCategory = {
  ENGAGEMENT: 'engagement',
  FORM: 'form',
  REFERRAL: 'referral',
  MEMBERSHIP: 'membership',
  SOCIAL: 'social'
} as const;

// Analytics event names
export const AnalyticsEvent = {
  PAGE_VIEW: 'page_view',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  REFERRAL_CLICK: 'referral_click',
  REFERRAL_SUBMIT: 'referral_submit',
  MEMBERSHIP_DOWNLOAD: 'membership_download',
  SOCIAL_SHARE: 'social_share',
  BUTTON_CLICK: 'button_click'
} as const;

class Analytics {
  private static instance: Analytics;

  private constructor() {
    // Initialize GA4
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      }
    }
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private pushEvent(eventName: string, params?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.gtag) {
      const eventParams = {
        ...params,
        ...(params?.category && { event_category: params.category }),
        ...(params?.label && { event_label: params.label }),
        ...(params?.value && { value: params.value })
      };

      window.gtag('event', eventName, {
        ...eventParams,
        send_to: 'G-BL5BJMW3ZH'
      });
    }
  }

  public trackPageView(path: string) {
    this.pushEvent(AnalyticsEvent.PAGE_VIEW, {
      page_path: path,
      page_title: document.title
    });
  }

  public trackFormStart() {
    this.pushEvent(AnalyticsEvent.FORM_START, {
      category: AnalyticsEventCategory.FORM
    });
  }

  public trackFormSubmit(success: boolean, error?: string) {
    this.pushEvent(success ? AnalyticsEvent.FORM_SUBMIT : AnalyticsEvent.FORM_ERROR, {
      category: AnalyticsEventCategory.FORM,
      success,
      error_message: error
    });
  }

  public trackReferralClick() {
    this.pushEvent(AnalyticsEvent.REFERRAL_CLICK, {
      category: AnalyticsEventCategory.REFERRAL
    });
  }

  public trackReferralSubmit(success: boolean) {
    this.pushEvent(AnalyticsEvent.REFERRAL_SUBMIT, {
      category: AnalyticsEventCategory.REFERRAL,
      success
    });
  }

  public trackMembershipDownload() {
    this.pushEvent(AnalyticsEvent.MEMBERSHIP_DOWNLOAD, {
      category: AnalyticsEventCategory.MEMBERSHIP
    });
  }

  public trackSocialShare(platform: string) {
    this.pushEvent(AnalyticsEvent.SOCIAL_SHARE, {
      category: AnalyticsEventCategory.SOCIAL,
      platform
    });
  }

  public trackButtonClick(buttonId: string, buttonText: string) {
    this.pushEvent(AnalyticsEvent.BUTTON_CLICK, {
      button_id: buttonId,
      button_text: buttonText
    });
  }
}

export const analytics = Analytics.getInstance();