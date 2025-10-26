'use client';

import './globals.css';
import { createGlobalStyle } from 'styled-components';
import backgroundImg from '../images/dot-image.jpg';

const GlobalStyle = createGlobalStyle`
 body {
  @font-face {
     font-family: 'DungGeunMo';
     src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    } // 웹 폰트 적용
     font-family: 'DungGeunMo';
    background-image: url(${(props) => backgroundImg.src});
    background-repeat : no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
