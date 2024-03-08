import Head from "next/head";
import HeicTojpg from "./HeicTojpg.js";

const App = () => {
  return (
    <>
      <Head>
        <title>heic to png image convert in 1 second</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="convert heic to png in 1 second | No file size limit | No images upload limit "
        />
        <meta
          name="keywords"
          content="heic to png, convert heic to png, heic to png multiple images at once, online, tool"
        />
      </Head>
      <HeicTojpg />
    </>
  );
};

export default App;
