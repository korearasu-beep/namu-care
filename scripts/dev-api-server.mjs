import http from 'http'
import { parse } from 'url'

const NOTION_API_KEY = process.env.NOTION_API_KEY
const DB_MAP = {
  main: process.env.NOTION_DB_MAIN,
  about: process.env.NOTION_DB_ABOUT,
  notice: process.env.NOTION_DB_NOTICE,
  album: process.env.NOTION_DB_ALBUM,
  settings: process.env.NOTION_DB_SETTINGS,
  service: process.env.NOTION_DB_SERVICE_PHOTO,
}

const notionHeaders = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

function extractProps(page) {
  const props = page.properties
  const result = { id: page.id }
  for (const [key, val] of Object.entries(props)) {
    switch (val.type) {
      case 'title': result[key] = val.title?.[0]?.plain_text || ''; break
      case 'rich_text': result[key] = val.rich_text?.[0]?.plain_text || ''; break
      case 'number': result[key] = val.number; break
      case 'select': result[key] = val.select?.name || ''; break
      case 'multi_select': result[key] = val.multi_select?.map(s => s.name) || []; break
      case 'date': result[key] = val.date?.start || ''; break
      case 'files': result[key] = val.files?.map(f => f.file?.url || f.external?.url || '') || []; break
      default: result[key] = null
    }
  }
  return result
}

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parse(req.url, true)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  if (pathname === '/api/notion') {
    const db = query.db
    if (!db || !DB_MAP[db]) {
      res.writeHead(400)
      return res.end(JSON.stringify({ error: 'Invalid db' }))
    }

    try {
      const r = await fetch(`https://api.notion.com/v1/databases/${DB_MAP[db]}/query`, {
        method: 'POST', headers: notionHeaders, body: JSON.stringify({ sorts: [] }),
      })
      const data = await r.json()
      const items = data.results.map(extractProps)
      res.writeHead(200)
      res.end(JSON.stringify(items))
    } catch (err) {
      res.writeHead(500)
      res.end(JSON.stringify({ error: err.message }))
    }
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Not found' }))
  }
})

server.listen(3001, () => console.log('🔌 API 서버 실행: http://localhost:3001'))
