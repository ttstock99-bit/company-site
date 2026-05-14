export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* 헤더 */}
      <nav className="flex justify-between p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">튼튼주식</h1>
        <div className="space-x-4">
          <a href="#">홈</a>
          <a href="#">리포트</a>
          <a href="#">유튜브</a>
        </div>
      </nav>

      {/* 메인 히어로 섹션 */}
      <header className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">흔들리지 않는 투자, <br/>튼튼주식과 함께하세요</h2>
        <p className="text-gray-400 mb-8">유튜브 채널 '튼튼주식'의 핵심 인사이트와 분석 리포트를 확인하세요.</p>
        <button className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
          유튜브 채널 바로가기
        </button>
      </header>

      {/* 리스트 섹션 */}
      <section className="card-grid">
  {[1, 2, 3, 4].map((i) => (
    <div key={i} className="card">
      <h3 className="font-bold">최신 영상 제목 {i}</h3>
      <p className="text-gray-400">2026.05.14</p>
    </div>
  ))}
</section>
    </div>
  );
}