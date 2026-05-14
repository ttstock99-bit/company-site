export const metadata = {
  title: "VISION INSIGHT",
  description: "기업 홈페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
