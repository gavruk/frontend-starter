import Head from 'next/head';

import Navbar from './navbar/navbar';

import styles from './layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Frontend starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
}
