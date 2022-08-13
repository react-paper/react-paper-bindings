import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Layout } from 'components/layout';
import { AppProvider } from 'components/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default MyApp;
