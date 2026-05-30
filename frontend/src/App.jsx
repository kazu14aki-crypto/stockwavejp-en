import { useState, useEffect } from 'react'
import { useStatus }   from './hooks/useMarketData.js'
import { AuthProvider } from './hooks/useAuth.jsx'
import Header      from './components/Header'
import Sidebar     from './components/Sidebar'
import TopPage     from './components/pages/TopPage'
import ThemeList   from './components/pages/ThemeList'
import Heatmap     from './components/pages/Heatmap'
import MarketRank  from './components/pages/MarketRank'
import ThemeDetail from './components/pages/ThemeDetail'
import CustomTheme from './components/pages/CustomTheme'
import News        from './components/pages/News'
import HowTo       from './components/pages/HowTo'
import Settings    from './components/pages/Settings'
import Disclaimer  from './components/pages/Disclaimer'
import Column      from './components/pages/Column'
import PrivacyPolicy from './components/pages/PrivacyPolicy'
import TermsOfService from './components/pages/TermsOfService'
import SiteInfo    from './components/pages/SiteInfo'
import WeeklyReport from './components/pages/WeeklyReport'
import StockSearch          from './components/pages/StockSearch'
import InstitutionalHoldings from './components/pages/InstitutionalHoldings'
import Plan                  from './components/pages/Plan'
import LegalNotice           from './components/pages/LegalNotice'
import PlanGate              from './components/PlanGate'
import { SubscriptionProvider } from './hooks/useSubscription.js'

const PAGES = [
  { icon:'🏠', label:'Home',                    component:TopPage              },
  { icon:'📊', label:'Theme List',              component:ThemeList            },
  { icon:'🔥', label:'Heatmap',                 component:Heatmap              },
  { icon:'🔍', label:'Theme Detail',            component:ThemeDetail          },
  { icon:'📋', label:'Market Ranking',          component:MarketRank           },
  { icon:'🔎', label:'Stock Search',            component:StockSearch          },
  { icon:'🎨', label:'Custom Theme',            component:CustomTheme          },
  { icon:'🏦', label:'Institutional Holdings',  component:InstitutionalHoldings},
  { icon:'📰', label:'Weekly Report',           component:WeeklyReport         },
  { icon:'📝', label:'Column',                  component:Column               },
]
const PAGES_OTHER = [
  { icon:'🏢', label:'About',          component:SiteInfo      },
  { icon:'📣', label:'News',           component:News          },
  { icon:'📖', label:'How to Use',     component:HowTo         },
  { icon:'💰', label:'Pricing',        component:Plan          },
  { icon:'⚙️', label:'Settings',      component:Settings      },
]

const PAGES_FOOTER = [
  { icon:'⚖️', label:'Disclaimer',        component:Disclaimer    },
  { icon:'🔒', label:'Privacy Policy',    component:PrivacyPolicy },
  { icon:'📋', label:'Terms of Service',  component:TermsOfService},
  { icon:'🛒', label:'Legal Notice',      component:LegalNotice   },
]

// ContactGoogleフォームURL（実際のURLに変更してください）
const CONTACT_FORM_URL = 'https://forms.gle/XjNypTdmZt265Kib6'
const ALL_PAGES     = [...PAGES, ...PAGES_OTHER]
const COLOR_THEME_KEY = 'swjp_color_theme'

function AppInner() {
  const [currentPage,   setCurrentPage]   = useState('Home')
  const [targetArticleId, setTargetArticleId] = useState(null)
  const [targetTheme,     setTargetTheme]     = useState(null)

  // URLハッシュからページ・記事IDを初期化
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash.startsWith('column/')) {
      const articleId = hash.replace('column/', '')
      setCurrentPage('Column')
      setTargetArticleId(articleId)
    } else if (hash === 'terms') {
      setCurrentPage('Terms of Service')
    } else if (hash === 'privacy') {
      setCurrentPage('Privacy Policy')
    }
    // ハッシュ変化を監視
    const onHashChange = () => {
      const h = window.location.hash.replace('#', '')
      if (h.startsWith('column/')) {
        const aid = h.replace('column/', '')
        setCurrentPage('Column')
        setTargetArticleId(aid)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode,    setViewMode]    = useState('auto')
  const [isMobile,    setIsMobile]    = useState(() => typeof window !== 'undefined' && window.innerWidth <= 1280)
  const [colorTheme,  setColorTheme]  = useState(
    () => localStorage.getItem(COLOR_THEME_KEY) || 'dark'
  )
  const status = useStatus()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme)
    localStorage.setItem(COLOR_THEME_KEY, colorTheme)
  }, [colorTheme])

  useEffect(() => {
    const check = () => {
      if (viewMode === 'mobile') { setIsMobile(true); return }
      if (viewMode === 'pc')     { setIsMobile(false); return }
      // iPad Pro横向き(1366px)まで対応するため1280px以下をタブレット扱い
      setIsMobile(window.innerWidth <= 1280)
    }
    check()
    window.addEventListener('resize', check)
    const onOrientChange = () => setTimeout(check, 150)
    window.addEventListener('orientationchange', onOrientChange)
    return () => {
      window.removeEventListener('resize', check)
      window.removeEventListener('orientationchange', onOrientChange)
    }
  }, [viewMode])

  const currentPageObj = ALL_PAGES.find(p => p.label === currentPage)
  const PageComponent  = currentPageObj?.component
  const handlePageChange = (label, articleId = null) => {
    setCurrentPage(label)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setTargetArticleId(articleId)
    // Theme Detailの場合はTheme Nameを保存
    if (label === 'Theme Detail') {
      setTargetTheme(articleId || null)
    } else {
      setTargetTheme(null)
    }
    // URLハッシュを更新（SEO・直接リンク対応）
    if (label === 'Column' && articleId) {
      window.history.replaceState(null, '', `#column/${articleId}`)
    } else if (label === '利用規約') {
      window.history.replaceState(null, '', '#terms')
    } else if (label === 'プライバシーポリシー') {
      window.history.replaceState(null, '', '#privacy')
    } else {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  const handleLogoClick  = () => { setCurrentPage('Home'); setSidebarOpen(false) }

  const pageProps = (() => {
    if (currentPage === 'Settings') return { viewMode, onViewModeChange:setViewMode, colorTheme, onColorThemeChange:setColorTheme, isMobile }
    if (currentPage === 'Home') return { onNavigate: handlePageChange, isMobile }
    if (currentPage === 'Column') return { initialArticleId: targetArticleId, onNavigate: handlePageChange, isMobile }
    if (currentPage === 'Theme List') return { onNavigate: handlePageChange, isMobile }
    if (currentPage === 'Theme Detail') return { onNavigate: handlePageChange, initialTheme: targetTheme, isMobile }
    if (currentPage === 'Heatmap') return { onNavigate: handlePageChange, isMobile }
    if (currentPage === 'Weekly Report') return { onNavigate: handlePageChange, isMobile }
    if (currentPage === 'Market Ranking') return { onNavigate: handlePageChange, isMobile }
    return { isMobile }
  })()

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Header
        status={status}
        onMenuClick={() => setSidebarOpen(o => !o)}
        sidebarOpen={sidebarOpen}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onLogoClick={handleLogoClick}
      />

      {sidebarOpen && isMobile && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:800,
        }} />
      )}

      <Sidebar
        pages={PAGES} pagesOther={PAGES_OTHER}
        currentPage={currentPage} onPageChange={handlePageChange}
        isOpen={sidebarOpen} isMobile={isMobile}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        contactUrl={CONTACT_FORM_URL}
      />

      <main style={{
        marginLeft: isMobile ? '0' : 'var(--sidebar)',
        paddingTop: 'var(--header)',
        minHeight: '100vh',
        transition: 'margin-left 0.25s',
        background: 'var(--bg)',
      }}>
        {PageComponent ? (
          currentPage === 'Institutional Holdings' ? (
            <PlanGate feature="institutional" onNavigate={handlePageChange}>
              <PageComponent {...pageProps} />
            </PlanGate>
          ) : currentPage === 'Market Ranking' ? (
            <PlanGate feature="market_detail" onNavigate={handlePageChange}>
              <PageComponent {...pageProps} />
            </PlanGate>
          ) : (
            <PageComponent {...pageProps} />
          )
        ) : (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
            height:'calc(100vh - var(--header))', flexDirection:'column', gap:'16px', color:'var(--text3)' }}>
            <div style={{ fontSize:'48px' }}>{currentPageObj?.icon}</div>
            <div style={{ fontSize:'18px', fontWeight:600, color:'var(--text2)' }}>{currentPage}</div>
            <div style={{ fontSize:'13px' }}>This page is coming soon</div>
          </div>
        )}

        <footer style={{ borderTop:'1px solid var(--border)', padding:'16px 24px',
          textAlign:'center', color:'var(--text3)', fontSize:'11px' }}>
          <div style={{ marginBottom:'8px', display:'flex', justifyContent:'center', gap:'20px', flexWrap:'wrap' }}>
            <button onClick={() => handlePageChange('Disclaimer')} style={{
              background:'none', border:'none', color:'var(--text3)', cursor:'pointer',
              fontSize:'11px', fontFamily:'var(--font)', padding:0,
              textDecoration:'underline', textUnderlineOffset:'2px',
            }}>Disclaimer</button>
            <button onClick={() => handlePageChange('Privacy Policy')} style={{
              background:'none', border:'none', color:'var(--text3)', cursor:'pointer',
              fontSize:'11px', fontFamily:'var(--font)', padding:0,
              textDecoration:'underline', textUnderlineOffset:'2px',
            }}>Privacy Policy</button>
            <button onClick={() => handlePageChange('Terms of Service')} style={{
              background:'none', border:'none', color:'var(--text3)', cursor:'pointer',
              fontSize:'11px', fontFamily:'var(--font)', padding:0,
              textDecoration:'underline', textUnderlineOffset:'2px',
            }}>Terms of Service</button>
            <a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer" style={{
              color:'var(--text3)', fontSize:'11px', fontFamily:'var(--font)',
              textDecoration:'underline', textUnderlineOffset:'2px',
            }}>Contact</a>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'2px 0', alignItems:'center' }}>
            <span style={{ color:'#e63030', fontWeight:700 }}>Stock</span>
            <span style={{ fontWeight:700, color:'var(--text2)' }}>Wave</span>
            <span style={{ color:'#e63030', fontWeight:700, fontSize:'10px' }}>JP</span>
            <span style={{ whiteSpace:'nowrap' }}>&nbsp;—&nbsp;stockwavejp-en.com</span>
            <span style={{ whiteSpace:'nowrap' }}>&nbsp;—&nbsp;Not financial advice</span>
            <span style={{ whiteSpace:'nowrap' }}>&nbsp;—&nbsp;© 2026</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

// 旧バージョンのLocalStorageキャッシュを自動削除
;(function cleanOldCache() {
  const CURRENT = 'swjp_v3_'
  const OLD_PREFIXES = ['swjp_', 'swjp_v1_', 'swjp_v2_']
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(k => {
      const isOld = OLD_PREFIXES.some(p => k.startsWith(p))
      const isCurrent = k.startsWith(CURRENT)
      if (isOld && !isCurrent) {
        localStorage.removeItem(k)
      }
    })
  } catch {}
})()

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
      <AppInner />
    </SubscriptionProvider>
    </AuthProvider>
  )
}
