import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "react-daisyui";
import { Layout } from "components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme dataTheme="bumblebee">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}

export default MyApp;
