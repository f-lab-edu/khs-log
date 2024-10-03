import {NextResponse} from 'next/server'

const MOCK_DATA = [
  {
    id: 1,
    title: '1st Title',
    content:
      '1st Content 1st Content 1st Content 1st Content 1st Content 1st Content',
    image: '/images/ogu.webp',
  },
  {
    id: 2,
    title: '2nd 제목',
    content:
      '1st Content 1st Content 1st Content 1st Content 1st Content 1st Content',
    image: '/images/doguri.png',
  },
]

// GET 요청 처리 함수
export async function GET() {
  return NextResponse.json(MOCK_DATA, {status: 200})
}
