import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('src')
const japanese = /[ぁ-んァ-ヶ一-龯]/
const ignored = new Set([
  'components/pages/columnData.js',
  'utils/themeNames.js',
  'data/globalRelatedStocks.js',
  'i18n/locales/ja.js',
])

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes:true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

const errors=[]
for (const file of walk(root)) {
  if (!/\.(jsx|js)$/.test(file)) continue
  const rel=path.relative(root,file).replaceAll('\\','/')
  if (ignored.has(rel)) continue

  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/)
  lines.forEach((line,index)=>{
    const trimmed=line.trim()
    if (!japanese.test(line) || trimmed.startsWith('//') || trimmed.startsWith('*')) return

    // Detect likely user-visible JSX text and common UI-bearing attributes.
    const jsxText=/>[^<{]*[ぁ-んァ-ヶ一-龯][^<{]*</.test(line)
    const uiAttribute=/(placeholder|aria-label|title|alt)\s*=/.test(line)
    const browserMessage=/(alert|confirm)\s*\(/.test(line)
    if (jsxText || uiAttribute || browserMessage) {
      errors.push(`${rel}:${index+1}: ${trimmed}`)
    }
  })
}

if (errors.length) {
  console.error('Japanese user-interface text was found in the English frontend:\n'+errors.join('\n'))
  process.exit(1)
}
console.log('English UI guard passed.')
