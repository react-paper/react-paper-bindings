import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from 'components/layout';
import { AppProvider } from 'components/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>react-paper-bindings</title>
        <meta
          name="description"
          content="Examples for react-paper-bindings library."
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
