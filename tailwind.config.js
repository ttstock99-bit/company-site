export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="flex justify-between p-6">
        <h1 className="text-2xl font-bold">튼튼주식</h1>
      </nav>
      <header className="hero">
        <h2 className="text-4xl font-bold">흔들리지 않는 투자, 튼튼주식과 함께하세요</h2>
      </header>
      <section className="card-grid p-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <h3>최신 영상 제목 {i}</h3>
            <p>2026.05.14</p>
          </div>
        ))}
      </section>
    </div>
  );
}