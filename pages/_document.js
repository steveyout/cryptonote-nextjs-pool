import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta name="description" content="Start mining uplexa with the best upx pool" />
          <meta name="keywords" content="Uplexa,pool,prop,hashrate,instant payments,cool ui" />
          <meta name="subject" content="Uplexa Mining pool" />
          <meta name="copyright" content="Bigminers" />
          <meta name="language" content="En" />
          <meta name="robots" content="index,follow" />
          <meta name="revised" content="Sunday, July 18th, 2010, 5:15 pm" />
          <meta name="abstract" content="" />
          <meta name="topic" content="uplexa pool" />
          <meta name="summary" content="" />
          <meta name="Classification" content="Business" />
          <meta name="author" content="Bigminers, support@bigminers.site" />
          <meta name="designer" content="" />
          <meta name="copyright" content="" />
          <meta name="reply-to" content="support@bigminers.site" />
          <meta name="owner" content="" />
          <meta name="url" content="http://uplexa.bigminers.site" />
          <meta name="identifier-URL" content="http://uplexa.bigminers.site" />
          <meta name="directory" content="submission" />
          <meta name="category" content="" />
          <meta name="coverage" content="Worldwide" />
          <meta name="distribution" content="Global" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="7 days" />
          <meta httpEquiv="Expires" content="0" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Cache-Control" content="no-cache" />
          {/* Google tag (gtag.js)*/}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-P7KG0PZE0R"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-P7KG0PZE0R');
            `}
          </Script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
