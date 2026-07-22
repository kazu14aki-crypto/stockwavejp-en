import fs from 'node:fs'
import path from 'node:path'

const reportRoot=path.resolve('public/data/weekly_reports')
const required=['week','title']
const errors=[]

if (fs.existsSync(reportRoot)) {
  for (const name of fs.readdirSync(reportRoot)) {
    if (!name.endsWith('.json') || name==='index.json') continue
    const file=path.join(reportRoot,name)
    let data
    try { data=JSON.parse(fs.readFileSync(file,'utf8')) }
    catch (error) {
      errors.push(`${name}: invalid JSON (${error.message})`)
      continue
    }
    for (const key of required) {
      if (!data?.[key]) errors.push(`${name}: missing ${key}`)
    }
    if (!data?.report && !data?.body) errors.push(`${name}: missing report/body`)
  }

  const indexFile=path.join(reportRoot,'index.json')
  if (fs.existsSync(indexFile)) {
    try {
      const index=JSON.parse(fs.readFileSync(indexFile,'utf8'))
      if (!Array.isArray(index) && !Array.isArray(index?.reports)) {
        errors.push('index.json: expected an array or { reports: [] }')
      }
    } catch (error) {
      errors.push(`index.json: invalid JSON (${error.message})`)
    }
  }
}

if (errors.length) {
  console.error('Report data validation failed:\n'+errors.join('\n'))
  process.exit(1)
}
console.log('Report data validation passed.')
