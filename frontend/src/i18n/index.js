import en from './locales/en'
import ja from './locales/ja'

const dictionaries = { en, ja }
const DEFAULT_LOCALE = import.meta.env.VITE_APP_LOCALE || 'en'

function resolve(object, key) {
  return key.split('.').reduce((value, part) => value?.[part], object)
}

export function translate(key, params = {}, locale = DEFAULT_LOCALE) {
  const template = resolve(dictionaries[locale] || dictionaries.en, key)
    ?? resolve(dictionaries.en, key)
    ?? key
  return String(template).replace(/\{(\w+)\}/g, (_, name) =>
    params[name] === undefined ? `{${name}}` : String(params[name])
  )
}

export function useI18n(locale = DEFAULT_LOCALE) {
  return {
    locale,
    t: (key, params) => translate(key, params, locale),
  }
}

export { dictionaries, DEFAULT_LOCALE }
