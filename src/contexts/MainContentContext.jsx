import { createContext, useContext } from 'react'
import { useNotion } from '../hooks/useNotion'
import { FALLBACK } from '../constants/fallback'

const MainContentContext = createContext({})

export function MainContentProvider({ children }) {
  const { data, loading } = useNotion('main')

  const items = data || FALLBACK.main || []
  const sections = {}

  for (const item of items) {
    const section = item['구분']
    if (!section) continue
    if (!sections[section]) sections[section] = []
    sections[section].push(item)
  }

  for (const key of Object.keys(sections)) {
    sections[key].sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))
  }

  return (
    <MainContentContext.Provider value={{ sections, loading }}>
      {children}
    </MainContentContext.Provider>
  )
}

export function useMainContent(sectionName) {
  const { sections, loading } = useContext(MainContentContext)
  return { data: sections[sectionName] || [], loading }
}
