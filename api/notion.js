const NOTION_API_KEY = process.env.NOTION_API_KEY

const DB_MAP = {
  main: process.env.NOTION_DB_MAIN,
  about: process.env.NOTION_DB_ABOUT,
  notice: process.env.NOTION_DB_NOTICE,
  album: process.env.NOTION_DB_ALBUM,
  settings: process.env.NOTION_DB_SETTINGS,
  service: process.env.NOTION_DB_SERVICE_PHOTO,
}

const headers = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

async function queryDB(dbId, sorts) {
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ sorts: sorts || [] }),
  })
  return res.json()
}

function extractProps(page) {
  const props = page.properties
  const result = { id: page.id }

  for (const [key, val] of Object.entries(props)) {
    switch (val.type) {
      case 'title':
        result[key] = val.title?.[0]?.plain_text || ''
        break
      case 'rich_text':
        result[key] = val.rich_text?.[0]?.plain_text || ''
        break
      case 'number':
        result[key] = val.number
        break
      case 'select':
        result[key] = val.select?.name || ''
        break
      case 'multi_select':
        result[key] = val.multi_select?.map(s => s.name) || []
        break
      case 'date':
        result[key] = val.date?.start || ''
        break
      case 'files':
        result[key] = val.files?.map(f => f.file?.url || f.external?.url || '') || []
        break
      default:
        result[key] = null
    }
  }

  return result
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { db } = req.query

  if (!db || !DB_MAP[db]) {
    return res.status(400).json({ error: 'Invalid db parameter. Use: main, about, notice, album, settings, service' })
  }

  try {
    const data = await queryDB(DB_MAP[db])
    const items = data.results.map(extractProps)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(items)
  } catch (err) {
    console.error('Notion API error:', err)
    return res.status(500).json({ error: 'Failed to fetch from Notion' })
  }
}
