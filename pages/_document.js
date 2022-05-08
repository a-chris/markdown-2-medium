import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto%20Slab:400&display=swap"
          rel="stylesheet"
        />
        <Script
          defer
          data-domain="markdown-2-medium.vercel.app"
          src="https://faenz.onrender.com/faenz.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
