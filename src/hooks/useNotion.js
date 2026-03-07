import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.DEV ? '/api/notion' : '/api/notion'

export function useNotion(db) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}?db=${db}`)
        if (!res.ok) throw new Error('API 응답 오류')
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [db])

  return { data, loading, error }
}

export function useNotionFiltered(db, filterKey, filterValue) {
  const { data, loading, error } = useNotion(db)

  const filtered = data?.filter(item => item[filterKey] === filterValue) || null

  return { data: filtered, loading, error }
}
