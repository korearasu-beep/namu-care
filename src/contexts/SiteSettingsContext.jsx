import { createContext, useContext } from 'react'
import { useNotion } from '../hooks/useNotion'
import { FALLBACK } from '../constants/fallback'

const SiteSettingsContext = createContext({})

export function SiteSettingsProvider({ children }) {
  const { data, loading } = useNotion('settings')

  const settings = {}
  const items = data || FALLBACK.settings
  for (const item of items) {
    if (item['이름'] && item['값']) {
      settings[item['이름']] = item['값']
    }
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
