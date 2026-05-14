import './globals.css';

export const metadata = {
  title: "튼튼주식",
  description: "흔들리지 않는 투자, 튼튼주식",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}