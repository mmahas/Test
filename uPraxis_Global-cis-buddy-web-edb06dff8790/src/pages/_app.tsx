/* eslint-disable react/react-in-jsx-scope */
import '../styles/antd.less';
// import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
