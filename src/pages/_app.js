import "@/styles/globals.css";
import "@/styles/styles.css";
import "@/styles/navbar.scss";
import "@/styles/footer.scss";
import "@/styles/faq.scss";
import Head from "next/head";
import Navbar from "@/common/Navbar";
import Footer from "@/common/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
