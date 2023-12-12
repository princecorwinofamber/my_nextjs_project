import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import ForumLayout from "../components/ForumLayout";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <ForumLayout>
        <Component {...pageProps} />
      </ForumLayout>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </SWRConfig>
  );
}

export default MyApp;
