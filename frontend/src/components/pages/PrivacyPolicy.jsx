export default function PrivacyPolicy() {
  return (
    <div style={{ padding:'28px 32px 60px', maxWidth:'760px', margin:'0 auto' }}>
      <h1 style={{ fontSize:'24px', fontWeight:700, color:'#e8f0ff', marginBottom:'4px' }}>Privacy Policy</h1>
      <p style={{ fontSize:'12px', color:'var(--text3)', marginBottom:'32px' }}>Last updated: March 26, 2026</p>
      {[
        { title:'1. Basic Policy', body:'StockWaveJP ("this site") establishes the following policy regarding the handling of users\' personal information. This site recognizes the importance of protecting personal information and endeavors to handle it appropriately.' },
        { title:'2. Information Collected', body:'This site may collect the following information:\n\n· Access logs (IP address, browser information, access date/time)\n· Usage data via Google Analytics (page views, time on site, etc.)\n· Data entered by users in the Custom Theme feature (stored in browser local storage)\n\nWe do not collect personally identifiable information such as name or email address (except when using Google Sign-In).' },
        { title:'3. Use of Cookies', body:'This site uses cookies for the purpose of improving user experience and analyzing usage.\n\n· Google Analytics: Used to analyze site usage. Collected data is anonymized and cannot identify individuals.\n· Google AdSense: Used for advertising optimization.\n\nYou can disable cookies in your browser settings, but some features may not function properly.' },
        { title:'4. Advertising', body:'This site uses Google AdSense, an advertising service provided by Google, a third-party ad serving company. Google and other third-party ad serving companies use cookies to serve ads based on your prior visits to this site and other websites.\n\nYou may opt out of personalized advertising by visiting Google\'s Ad Settings. You can also opt out of third-party cookies by visiting www.aboutads.info.' },
        { title:'5. Analytics Tools', body:'This site uses Google Analytics. Google Analytics uses cookies to collect traffic data. This traffic data is collected anonymously and does not identify individuals.' },
        { title:'6. Disclaimer', body:'Information on this site is prepared based on sources believed to be reliable, but we do not guarantee its accuracy or completeness. We accept no responsibility for any damages arising from the use of information on this site.' },
        { title:'7. Changes to Privacy Policy', body:'This policy may be changed without notice due to changes in laws or other circumstances. The revised policy takes effect when posted on this page.' },
        { title:'8. Contact', body:'For inquiries regarding this Privacy Policy, please contact us via X (formerly Twitter) DM (@StockWaveJP) or the contact form on this site.' },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom:'28px' }}>
          <h2 style={{ fontSize:'15px', fontWeight:700, color:'#e8f0ff', marginBottom:'10px', borderLeft:'3px solid var(--accent)', paddingLeft:'12px' }}>{s.title}</h2>
          <div style={{ fontSize:'13px', color:'var(--text2)', lineHeight:1.9, whiteSpace:'pre-line' }}>{s.body}</div>
        </div>
      ))}
    </div>
  )
}
