const API_KEY = process.env.NOTION_API_KEY
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

const DB = {
  MAIN: process.env.NOTION_DB_MAIN,
  ABOUT: process.env.NOTION_DB_ABOUT,
  NOTICE: process.env.NOTION_DB_NOTICE,
  ALBUM: process.env.NOTION_DB_ALBUM,
  SETTINGS: process.env.NOTION_DB_SETTINGS,
  SERVICE_PHOTO: process.env.NOTION_DB_SERVICE_PHOTO,
}

async function createPage(dbId, properties) {
  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers,
    body: JSON.stringify({ parent: { database_id: dbId }, properties }),
  })
  const data = await res.json()
  if (data.object === 'error') throw new Error(data.message)
  return data
}

function title(text) { return { title: [{ text: { content: text } }] } }
function richText(text) { return { rich_text: [{ text: { content: text } }] } }
function num(n) { return { number: n } }
function sel(name) { return { select: { name } } }
function multiSel(names) { return { multi_select: names.map(n => ({ name: n })) } }
function date(d) { return { date: { start: d } } }

async function main() {
  console.log('🌱 샘플 데이터 입력 시작...\n')

  // ── 사이트설정 DB ──
  console.log('⚙️ 사이트설정...')
  const settings = [
    ['전화번호', '041-555-9991'],
    ['이메일', 'namuhelp25@naver.com'],
    ['주소', '충청남도 천안시 서북구 불당25로 174, 1021호'],
    ['운영시간', '평일·주말 포함 07:00~21:00'],
    ['센터명', '나무재가방문요양센터'],
    ['태그라인', '어르신과 보호자 모두 만족하는 편안한 도움 서비스를 제공하겠습니다.'],
  ]
  for (const [k, v] of settings) {
    await createPage(DB.SETTINGS, { '이름': title(k), '값': richText(v) })
  }
  console.log('  ✅ 완료')

  // ── 메인콘텐츠 DB ──
  console.log('🏠 메인콘텐츠...')
  await createPage(DB.MAIN, { '이름': title('히어로 제목'), '구분': sel('hero'), '내용': richText('어르신의 일상에 따뜻한 돌봄을 더합니다'), '순서': num(1) })
  await createPage(DB.MAIN, { '이름': title('히어로 설명'), '구분': sel('hero'), '내용': richText('전문 요양보호사가 가정을 방문하여 어르신께 맞춤형 케어 서비스를 제공합니다.'), '순서': num(2) })
  await createPage(DB.MAIN, { '이름': title('누적 이용자'), '구분': sel('stat'), '내용': richText('누적 이용자'), '숫자값': num(500), '순서': num(1) })
  await createPage(DB.MAIN, { '이름': title('돌봄 경험'), '구분': sel('stat'), '내용': richText('돌봄 경험'), '숫자값': num(10), '순서': num(2) })
  await createPage(DB.MAIN, { '이름': title('만족도'), '구분': sel('stat'), '내용': richText('만족도'), '숫자값': num(98), '순서': num(3) })
  await createPage(DB.MAIN, { '이름': title('CTA 제목'), '구분': sel('cta'), '내용': richText('어르신을 위한 첫 걸음, 무료 상담으로 시작하세요'), '순서': num(1) })
  console.log('  ✅ 완료')

  // ── 회사소개 DB ──
  console.log('🏢 회사소개...')
  await createPage(DB.ABOUT, { '이름': title('센터장 인사말'), '구분': sel('greeting'), '내용': richText('안녕하세요, 나무재가방문요양센터 센터장입니다.\n\n어르신 한 분 한 분을 가족처럼 생각하며, 따뜻하고 전문적인 돌봄 서비스를 제공하기 위해 최선을 다하고 있습니다.\n\n나무처럼 든든하게, 어르신의 편안한 일상을 함께 만들어 가겠습니다.'), '순서': num(1) })
  await createPage(DB.ABOUT, { '이름': title('진심 어린 돌봄'), '구분': sel('value'), '내용': richText('어르신을 가족처럼 대하며, 진심을 담은 돌봄 서비스를 제공합니다.'), '순서': num(1) })
  await createPage(DB.ABOUT, { '이름': title('신뢰와 전문성'), '구분': sel('value'), '내용': richText('체계적인 교육과 관리를 통해 전문적이고 신뢰할 수 있는 서비스를 보장합니다.'), '순서': num(2) })
  await createPage(DB.ABOUT, { '이름': title('소통과 협력'), '구분': sel('value'), '내용': richText('보호자와의 긴밀한 소통으로 어르신에게 최적의 돌봄 환경을 만듭니다.'), '순서': num(3) })
  await createPage(DB.ABOUT, { '이름': title('빠른 대응'), '구분': sel('value'), '내용': richText('긴급 상황 발생 시 즉각 대응하여 어르신의 안전을 최우선으로 합니다.'), '순서': num(4) })
  await createPage(DB.ABOUT, { '이름': title('센터 개소'), '구분': sel('history'), '내용': richText('나무재가방문요양센터 개소, 장기요양기관 지정'), '연도': num(2025), '순서': num(1) })
  await createPage(DB.ABOUT, { '이름': title('서비스 기획'), '구분': sel('history'), '내용': richText('방문요양 서비스 기획 및 준비, 요양보호사 팀 구성'), '연도': num(2024), '순서': num(2) })
  console.log('  ✅ 완료')

  // ── 공지사항 DB ──
  console.log('📢 공지사항...')
  await createPage(DB.NOTICE, { '이름': title('2025년 나무재가방문요양센터 개소 안내'), '카테고리': sel('공지'), '날짜': date('2025-03-01'), '내용': richText('안녕하세요. 나무재가방문요양센터가 2025년 3월 정식 개소하였습니다. 어르신과 보호자분들께 최상의 돌봄 서비스를 제공하기 위해 최선을 다하겠습니다.') })
  await createPage(DB.NOTICE, { '이름': title('장기요양등급 신청 방법 안내'), '카테고리': sel('안내'), '날짜': date('2025-02-20'), '내용': richText('장기요양등급 신청 절차와 필요 서류에 대해 안내드립니다. 국민건강보험공단에 신청서를 제출하시면 방문조사 후 등급이 결정됩니다.') })
  await createPage(DB.NOTICE, { '이름': title('요양보호사 채용 공고'), '카테고리': sel('공지'), '날짜': date('2025-02-15'), '내용': richText('나무재가방문요양센터에서 함께할 요양보호사를 모집합니다.') })
  await createPage(DB.NOTICE, { '이름': title('방문요양 서비스 이용 절차 안내'), '카테고리': sel('안내'), '날짜': date('2025-02-10'), '내용': richText('방문요양 서비스 이용 절차를 안내드립니다.') })
  await createPage(DB.NOTICE, { '이름': title('개인정보처리방침 개정 안내'), '카테고리': sel('공지'), '날짜': date('2025-02-01'), '내용': richText('개인정보처리방침이 개정되었습니다.') })
  console.log('  ✅ 완료')

  // ── 활동앨범 DB ──
  console.log('📸 활동앨범...')
  await createPage(DB.ALBUM, { '이름': title('봄맞이 나들이 활동'), '날짜': date('2025-03-05') })
  await createPage(DB.ALBUM, { '이름': title('어르신 생신 축하'), '날짜': date('2025-02-28') })
  await createPage(DB.ALBUM, { '이름': title('설날 행사'), '날짜': date('2025-02-01') })
  await createPage(DB.ALBUM, { '이름': title('인지활동 프로그램'), '날짜': date('2025-01-20') })
  await createPage(DB.ALBUM, { '이름': title('건강 체조 시간'), '날짜': date('2025-01-15') })
  await createPage(DB.ALBUM, { '이름': title('센터 개소식'), '날짜': date('2025-01-10') })
  console.log('  ✅ 완료')

  // ── 서비스사진 DB ──
  console.log('🖼️ 서비스사진...')
  await createPage(DB.SERVICE_PHOTO, { '이름': title('방문요양 서비스'), '설명': richText('일상생활 지원, 신체활동 보조, 정서 지원 등 맞춤 돌봄을 제공합니다.'), '태그': multiSel(['방문요양']), '순서': num(1) })
  await createPage(DB.SERVICE_PHOTO, { '이름': title('방문목욕 서비스'), '설명': richText('전문 방문목욕 서비스로 거동이 불편한 어르신의 위생관리를 도와드립니다.'), '태그': multiSel(['방문목욕']), '순서': num(2) })
  await createPage(DB.SERVICE_PHOTO, { '이름': title('인지활동 프로그램'), '설명': richText('치매 예방 및 인지기능 향상을 위한 체계적인 프로그램을 운영합니다.'), '태그': multiSel(['인지활동']), '순서': num(3) })
  await createPage(DB.SERVICE_PHOTO, { '이름': title('건강관리 지원'), '설명': richText('투약 관리, 병원 동행, 건강 상태 체크 등을 지원합니다.'), '태그': multiSel(['건강관리']), '순서': num(4) })
  console.log('  ✅ 완료')

  console.log('\n🎉 모든 샘플 데이터 입력 완료!')
}

main().catch(console.error)
