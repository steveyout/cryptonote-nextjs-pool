import 'regenerator-runtime/runtime';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import Layout from '../layouts';
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
