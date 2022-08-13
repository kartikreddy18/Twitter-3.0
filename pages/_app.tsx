import type { AppProps } from "next/app";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MoralisProvider
      initializeOnMount
      appId={process.env.NEXT_PUBLIC_APP_ID || ""}
      serverUrl={process.env.NEXT_PUBLIC_DAPP_URL || ""}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
};

export default App;
