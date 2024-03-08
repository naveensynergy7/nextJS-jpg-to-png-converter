import Head from "next/head";
import Home from "../common/Home.js";

const App = () => {
  return (
    <>
      <Head>
        <title>Jpg to png - Convert jpeg to png</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="convert jpg/jpeg to png in 1 second | No file size limit | No images upload limit "
        />
        <meta
          name="keywords"
          content="jpg to png, convert jpg to png, jpg to png multiple images at once, online, tool, jpeg to png"
        />
      </Head>
      <Home />
    </>
  );
};

export default App;
