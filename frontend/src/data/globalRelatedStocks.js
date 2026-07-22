export const GLOBAL_THEME_STOCKS = {
  'AI半導体': [['NVDA','NVIDIA'],['AMD','AMD'],['AVGO','Broadcom'],['TSM','TSMC'],['ASML','ASML'],['MU','Micron']],
  '半導体製造装置': [['ASML','ASML'],['AMAT','Applied Materials'],['LRCX','Lam Research'],['KLAC','KLA']],
  'AIデータセンター': [['VRT','Vertiv'],['ETN','Eaton'],['ANET','Arista Networks'],['EQIX','Equinix'],['DLR','Digital Realty']],
  'フィジカルAI': [['NVDA','NVIDIA'],['ABB','ABB'],['ROK','Rockwell Automation'],['TER','Teradyne'],['SYM','Symbotic']],
  'ロボット・自動化': [['ABB','ABB'],['TER','Teradyne'],['ISRG','Intuitive Surgical'],['SYM','Symbotic']],
  'サイバーセキュリティ': [['PANW','Palo Alto Networks'],['CRWD','CrowdStrike'],['FTNT','Fortinet'],['ZS','Zscaler']],
  '防衛・航空': [['LMT','Lockheed Martin'],['RTX','RTX'],['NOC','Northrop Grumman'],['KTOS','Kratos'],['AVAV','AeroVironment']],
  '原子力発電': [['CEG','Constellation Energy'],['VST','Vistra'],['CCJ','Cameco'],['BWXT','BWX Technologies'],['SMR','NuScale Power']],
  '電線・銅': [['FCX','Freeport-McMoRan'],['SCCO','Southern Copper'],['NEX.L','Nexans']],
  '造船': [['329180.KS','HD Hyundai Heavy Industries'],['042660.KS','Hanwha Ocean'],['010140.KS','Samsung Heavy Industries'],['HII','Huntington Ingalls']],
  '銀行・金融': [['JPM','JPMorgan Chase'],['GS','Goldman Sachs'],['MS','Morgan Stanley'],['BLK','BlackRock']],
  '国土強靭化計画': [['CAT','Caterpillar'],['URI','United Rentals'],['XYL','Xylem'],['PWR','Quanta Services']],
  '医薬品・バイオ': [['LLY','Eli Lilly'],['NVO','Novo Nordisk'],['REGN','Regeneron'],['TMO','Thermo Fisher']],
  'M&A・事業承継': [['EVR','Evercore'],['HLI','Houlihan Lokey'],['LAZ','Lazard']],
}
export function getGlobalStocksForThemes(themes=[]) {
  const seen=new Set(), rows=[]
  for (const theme of themes) for (const [ticker,name] of (GLOBAL_THEME_STOCKS[theme]||[])) {
    if (!seen.has(ticker)) { seen.add(ticker); rows.push({ticker,name,theme}) }
  }
  return rows
}
