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
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    </Head>
    <Navbar />
    <Component {...pageProps} />
    <Footer/>
    </>
    );
  }
