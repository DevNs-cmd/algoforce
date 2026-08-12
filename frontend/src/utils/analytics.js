/**
 * AlgoForce Conversion Funnel & Event Analytics Utility
 * Instruments funnel events:
 * page_view -> cta_click -> form_start -> form_submit -> qualified_lead -> discovery -> assessment -> paid_pilot -> customer
 */

export const FUNNEL_STAGES = {
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  QUALIFIED_LEAD: 'qualified_lead',
  DISCOVERY: 'discovery',
  ASSESSMENT: 'assessment',
  PAID_PILOT: 'paid_pilot',
  CUSTOMER: 'customer',
}

/**
 * Log funnel event locally and dispatch to analytics providers if available (GA4, GTM, custom API)
 */
export const trackEvent = (eventName, payload = {}) => {
  const timestamp = new Date().toISOString()
  const eventData = {
    event: eventName,
    timestamp,
    url: typeof window !== 'undefined' ? window.location.href : '',
    pathname: typeof window !== 'undefined' ? window.location.pathname : '',
    ...payload,
  }

  if (import.meta.env.DEV) {
    console.log('[Analytics Funnel Event]:', eventData)
  }

  // Google Analytics / GTM fallback if present
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData)
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload)
  }

  return eventData
}

/**
 * Track page view with URL parameters
 */
export const trackPageView = (path = '') => {
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '')
  return trackEvent(FUNNEL_STAGES.PAGE_VIEW, {
    path: currentPath,
  })
}

/**
 * Track CTA Click (Workflow Assessment, Demo, Solution exploration)
 */
export const trackCTAClick = (ctaName, destination = '', location = '') => {
  return trackEvent(FUNNEL_STAGES.CTA_CLICK, {
    cta_name: ctaName,
    destination,
    click_location: location,
  })
}

/**
 * Track Lead Form Start
 */
export const trackFormStart = (formName = 'workflow_assessment_form') => {
  return trackEvent(FUNNEL_STAGES.FORM_START, {
    form_name: formName,
  })
}

/**
 * Track Lead Form Submission & Qualification Payload
 */
export const trackFormSubmit = (formName = 'workflow_assessment_form', formData = {}) => {
  return trackEvent(FUNNEL_STAGES.FORM_SUBMIT, {
    form_name: formName,
    inquiry_type: formData.inquiryType || 'assessment',
    company_size: formData.companySize || '',
    industry: formData.industry || '',
    systems: formData.systems || '',
    timeline: formData.timeline || '',
  })
}
