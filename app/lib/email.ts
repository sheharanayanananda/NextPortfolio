export const PORTFOLIO_EMAIL = "sheharanayanananda@gmail.com";

export const HIRE_EMAIL_TEMPLATE = {
  subject: "Opportunity: Software Engineering Role",
  body: `Hi Thineth,

I came across your portfolio and would like to discuss a potential opportunity.

Role / Position: 
Company / Organization: 
Brief Description: 

Looking forward to connecting.

Best regards,`,
};

// Formats body with CRLF (\r\n) per RFC 6068 for mailto URIs
const formattedBody = HIRE_EMAIL_TEMPLATE.body.replace(/\r?\n/g, "\r\n");

export const HIRE_MAILTO_URL = `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent(
  HIRE_EMAIL_TEMPLATE.subject
)}&body=${encodeURIComponent(formattedBody)}`;

export const HIRE_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  PORTFOLIO_EMAIL
)}&su=${encodeURIComponent(HIRE_EMAIL_TEMPLATE.subject)}&body=${encodeURIComponent(
  HIRE_EMAIL_TEMPLATE.body
)}`;

export const HIRE_OUTLOOK_URL = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
  PORTFOLIO_EMAIL
)}&subject=${encodeURIComponent(HIRE_EMAIL_TEMPLATE.subject)}&body=${encodeURIComponent(
  HIRE_EMAIL_TEMPLATE.body
)}`;


