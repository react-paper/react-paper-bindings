import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Theme } from 'react-daisyui';
import { Layout } from 'components/layout';
import { AppProvider } from 'components/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme dataTheme="light">
      <Head>
        <title>react-paper-bindings</title>
        <meta
          name="description"
          content="Examples for react-paper-bindings library."
        />
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </Theme>
  );
}

export default MyApp;
