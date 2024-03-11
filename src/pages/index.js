import Head from "next/head";
import Home from "../common/Home.js";

const App = () => {
  return (
    <>
      <Head>
        <title>Jpg to png - Convert jpeg to png</title>

        <meta
          name="keywords"
          content="jpg to png, convert jpg to png, jpg to png multiple images at once, online, tool, jpeg to png"
        />
        <meta
          name="description"
          content="convert jpg/jpeg to png in 1 second | No file size limit | No images upload limit "
        />
        <meta property="og:url" content="https://jpgtoopng.com/" />
        <meta property="og:site_name" content="Jpg to png" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://jpgtoopng.com/android-chrome-512x512.png"
        />
        <meta
          property="og:title"
          content="Jpg to png - convert jpg to png - Online"
        />
        <meta
          property="og:description"
          content="jpg to png, convert jpg to png, jpg to png multiple images at once, online, tool, jpeg to png"
        />
        <link rel="canonical" href="https://jpgtoopng.com/" />
      </Head>
      <Home />
    </>
  );
};

export default App;
