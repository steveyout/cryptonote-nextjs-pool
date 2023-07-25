import 'regenerator-runtime/runtime';
import { Chart, registerables } from 'chart.js';
import Head from 'next/head';
Chart.register(...registerables);
import Layout from '../layouts';
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
