import './globals.css';

export const metadata = {
  title: "튼튼주식",
  description: "흔들리지 않는 투자, 튼튼주식",
icons: {
  icon: '/favicon-32x32.png', // 이 파일을 우선적으로 보게 함
  shortcut: '/favicon.ico',
  apple: '/apple-touch-icon.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}