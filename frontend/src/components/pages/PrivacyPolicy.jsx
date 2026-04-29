export default function PrivacyPolicy() {
  const sections = [
    { title: '1. Basic Policy', body: 'StockWaveJP (hereinafter "the Site") considers the protection of users\' personal information and privacy to be of utmost importance, and complies with the Act on the Protection of Personal Information (Personal Information Protection Act) and other applicable laws.\n\nThis Privacy Policy explains the types of information collected and used by the Site, the purposes of use, management methods, and user rights. By using the Service, you agree to this Policy.' },
    { title: '2. Information We Collect', body: '【Automatically Collected Information】\n- Access logs (IP address, browser type/version, OS, referrer URL, access date and time)\n- Usage data via cookies and similar technologies\n- Statistical information such as page views, time on site, and behavior flows via Google Analytics\n\n【Information Voluntarily Provided by Users】\n- Email address and display name via Google account authentication (when using the Custom Theme feature)\n- Custom theme names and constituent stock information (stored in browser local storage or Supabase)\n\n【Information Not Collected】\n- Financial information such as credit card numbers or bank account details\n- Personal information that directly identifies individuals such as full name, address, or phone number (except email address during Google login)' },
    { title: '3. Purposes of Use', body: 'Collected information is used for the following purposes:\n\n- Providing, operating, and improving the Service\n- Providing user authentication and Custom Theme features\n- Analyzing service usage and statistics (Google Analytics)\n- Optimizing ad delivery via Google AdSense and other services\n- Detecting and preventing unauthorized access and misuse\n- Responding to violations of Terms of Service\n- Responding to legally required disclosures\n\nCollected information will not be used for purposes other than those listed above.' },
    { title: '4. Use of Cookies', body: '【Google Analytics】\nUsed to analyze site usage. Collected data is sent to Google servers and anonymized/aggregated. No personally identifiable information is included. For Google\'s data use, please refer to Google\'s Privacy Policy.\n\n【Google AdSense】\nUsed to deliver personalized ads based on users\' interests. If you do not want third-party ad network cookies, you can opt out on Google\'s ad settings page.\n\n【Supabase (Authentication)】\nUsed to maintain user login status.\n\nCookies can be disabled through browser settings, but some features (such as saving Custom Themes) may not function properly.' },
    { title: '5. Third-Party Disclosure', body: 'The Site does not provide or disclose collected information to third parties except in the following cases:\n\n- When user consent is obtained\n- When legally required disclosure is necessary (legal requests from courts, investigative agencies, etc.)\n- When necessary to protect life, body, or property, and obtaining consent from the individual is difficult\n- To contractors such as Google Analytics, Google AdSense, and Supabase (minimum necessary information within the scope of intended use)\n\nMain external services used by the Site and their privacy policies:\n- Google LLC: https://policies.google.com/privacy\n- Supabase Inc.: https://supabase.com/privacy' },
    { title: '6. External Data Transmission', body: 'The Site transmits data externally through the following services:\n\n【Google Analytics (Google LLC)】\nInformation transmitted: Browsing history/behavior logs via cookies (anonymized)\nPurpose: Access analysis and service improvement\n\n【Google AdSense (Google LLC)】\nInformation transmitted: Interest information based on cookies and browsing history\nPurpose: Targeted ad delivery\n\n【Infoway (Data Provider)】\nInformation transmitted: None (the Site receives data via API)\nPurpose: Stock data acquisition' },
    { title: '7. Data Storage and Security', body: 'The Site implements the following measures to securely manage collected information:\n\n- Encryption of communications via HTTPS (SSL/TLS)\n- Data storage via Supabase (SOC 2 Type II certified)\n- Regular security updates\n\nPlease note that data transmission over the internet carries inherent risks. While the Site makes its best efforts regarding information security, complete security cannot be guaranteed.' },
    { title: '8. User Rights', body: 'Users of the Site have the following rights:\n\n- The right to request disclosure of personal information held\n- The right to request correction or deletion of personal information\n- The right to request suspension of use of personal information\n- Google Analytics opt-out (using the Google Analytics Opt-out Add-on)\n\nTo exercise these rights, please contact us at the address below. We will respond within a reasonable time.' },
    { title: '9. Children\'s Privacy', body: 'The services on this Site are intended for users aged 18 and above. Persons under 18 years of age require parental consent to provide personal information. If we become aware that personal information has been provided by a person under 18, we will take appropriate action.' },
    { title: '10. Changes to This Privacy Policy', body: 'This Policy may be changed without notice due to legal revisions or changes to service content. Significant changes will be announced on the Site. Changes take effect when posted on this page.' },
    { title: '11. Contact Us', body: 'For inquiries regarding the handling of personal information, please contact us:\n\n- X (formerly Twitter) DM: @StockWaveJP\n- Contact form: accessible at https://stockwavejp-en.com\n\nBusiness hours: Weekdays (irregular). Responses may take several days.' },
  ]

  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'800px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'22px', fontWeight:700, color:'var(--text)', marginBottom:'4px' }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'28px' }}>
        Established: April 1, 2026　Last Revised: April 29, 2026
      </p>
      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom:'28px' }}>
          <h2 style={{ fontSize:'14px', fontWeight:700, color:'var(--text)', marginBottom:'10px',
            borderLeft:'3px solid var(--accent)', paddingLeft:'12px' }}>
            {s.title}
          </h2>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:2.0, whiteSpace:'pre-line' }}>
            {s.body}
          </div>
        </div>
      ))}
      <div style={{ fontSize:'12px', color:'var(--text3)', marginTop:'24px', textAlign:'center' }}>
        © 2026 StockWaveJP. All rights reserved.
      </div>
    </div>
  )
}
