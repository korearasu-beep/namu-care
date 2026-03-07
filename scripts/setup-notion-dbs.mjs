const API_KEY = process.env.NOTION_API_KEY
const PARENT_PAGE_ID = '2e20381e5c4f80eaa689c1d51b43a58c'

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

const DB_SCHEMAS = [
  {
    title: '메인콘텐츠 DB',
    icon: '🏠',
    properties: {
      '이름': { title: {} },
      '구분': { select: { options: [{ name: 'hero', color: 'green' }, { name: 'stat', color: 'blue' }, { name: 'cta', color: 'orange' }] } },
      '내용': { rich_text: {} },
      '숫자값': { number: {} },
      '이미지': { files: {} },
      '순서': { number: {} },
    },
  },
  {
    title: '회사소개 DB',
    icon: '🏢',
    properties: {
      '이름': { title: {} },
      '구분': { select: { options: [{ name: 'greeting', color: 'green' }, { name: 'value', color: 'blue' }, { name: 'history', color: 'yellow' }, { name: 'team', color: 'purple' }] } },
      '내용': { rich_text: {} },
      '이미지': { files: {} },
      '연도': { number: {} },
      '순서': { number: {} },
    },
  },
  {
    title: '공지사항 DB',
    icon: '📢',
    properties: {
      '이름': { title: {} },
      '카테고리': { select: { options: [{ name: '공지', color: 'red' }, { name: '안내', color: 'blue' }] } },
      '날짜': { date: {} },
      '내용': { rich_text: {} },
    },
  },
  {
    title: '활동앨범 DB',
    icon: '📸',
    properties: {
      '이름': { title: {} },
      '날짜': { date: {} },
      '사진': { files: {} },
    },
  },
  {
    title: '사이트설정 DB',
    icon: '⚙️',
    properties: {
      '이름': { title: {} },
      '값': { rich_text: {} },
    },
  },
  {
    title: '서비스사진 DB',
    icon: '🖼️',
    properties: {
      '이름': { title: {} },
      '설명': { rich_text: {} },
      '태그': { multi_select: { options: [{ name: '방문요양', color: 'green' }, { name: '방문목욕', color: 'blue' }, { name: '인지활동', color: 'yellow' }, { name: '건강관리', color: 'orange' }] } },
      '사진': { files: {} },
      '순서': { number: {} },
    },
  },
]

const ENV_KEYS = {
  '메인콘텐츠 DB': 'NOTION_DB_MAIN',
  '회사소개 DB': 'NOTION_DB_ABOUT',
  '공지사항 DB': 'NOTION_DB_NOTICE',
  '활동앨범 DB': 'NOTION_DB_ALBUM',
  '사이트설정 DB': 'NOTION_DB_SETTINGS',
  '서비스사진 DB': 'NOTION_DB_SERVICE_PHOTO',
}

async function main() {
  console.log('🌳 노션 DB 생성 시작...\n')

  const envLines = []

  for (const schema of DB_SCHEMAS) {
    try {
      const res = await fetch('https://api.notion.com/v1/databases', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          parent: { type: 'page_id', page_id: PARENT_PAGE_ID },
          title: [{ type: 'text', text: { content: schema.title } }],
          icon: { type: 'emoji', emoji: schema.icon },
          properties: schema.properties,
        }),
      })

      const data = await res.json()

      if (data.object === 'error') {
        console.error(`❌ ${schema.title} 실패:`, data.message)
      } else {
        console.log(`✅ ${schema.title} → ${data.id}`)
        envLines.push(`${ENV_KEYS[schema.title]}=${data.id}`)
      }
    } catch (err) {
      console.error(`❌ ${schema.title} 실패:`, err.message)
    }
  }

  console.log('\n📋 .env에 추가할 내용:\n')
  envLines.forEach((line) => console.log(line))
}

main()
