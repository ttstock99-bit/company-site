export default function Home() {
  return (
    <main style={{
      fontFamily: 'Arial',
      padding: '40px',
      lineHeight: '1.7'
    }}>
      <h1 style={{
        fontSize: '48px',
        marginBottom: '20px'
      }}>
        VISION INSIGHT
      </h1>

      <p style={{
        fontSize: '20px',
        color: '#555',
        marginBottom: '60px'
      }}>
        기업의 성장을 위한 데이터 & AI 파트너
      </p>

      <section style={{ marginBottom: '60px' }}>
        <h2>회사 소개</h2>
        <p>
          데이터 분석 및 AI 솔루션을 제공하는 기업형 홈페이지 예제입니다.
        </p>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2>서비스</h2>

        <ul>
          <li>데이터 분석</li>
          <li>AI 자동화</li>
          <li>디지털 컨설팅</li>
        </ul>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2>공지사항</h2>

        <ul>
          <li>홈페이지 오픈 안내</li>
          <li>신규 서비스 출시 예정</li>
          <li>고객 문의 응답 시간 안내</li>
        </ul>
      </section>

      <section>
        <h2>문의하기</h2>

        <p>Email: contact@company.com</p>
      </section>
    </main>
  );
}