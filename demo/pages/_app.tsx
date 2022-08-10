import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Theme } from 'react-daisyui';
import { Layout } from 'components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme dataTheme="bumblebee">
      <Head>
        <title>react-paper-bindings</title>
        <meta
          name="description"
          content="Examples for react-paper-bindings library."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}

export default MyApp;
