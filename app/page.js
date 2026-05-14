export default function Home() {
  return (
    <main>
      <header className="header">
        <h1 className="text-4xl font-bold mb-4">튼튼주식 분석 리포트</h1>
        <p className="text-gray-400">데이터 기반의 깊이 있는 금융 인사이트</p>
      </header>
      
      <section className="card-grid">
        {[
          { title: "L&F 주가 전망", date: "2026.05.14", desc: "이차전지 소재 시장 분석" },
          { title: "KG 그룹 이슈", date: "2026.05.14", desc: "기업 지배구조 및 사업 다각화" },
          { title: "미국 경제 지표", date: "2026.05.14", desc: "금리 인하와 시장의 방향성" },
          { title: "반도체 HBM 현황", date: "2026.05.14", desc: "장비주 투자 전략" },
        ].map((item, i) => (
          <div key={i} className="card">
            <span className="tag">INVESTMENT</span>
            <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>
        ))}
      </section>
    </main>
  );
}