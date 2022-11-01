import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [pageLoaded, setPageLoaded] = React.useState(false);
  React.useEffect(() => {
    setPageLoaded(true);
  }, []);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {pageLoaded && <Component {...pageProps} />}
    </React.Suspense>
  );
}
