import { FC } from "react";
import Head from "next/head";
import { Navbar } from "./Navbar";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>E Travel</title>
        <meta name="description" content="Follow your travel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-white dark:bg-gray-900">
        <Navbar />
        <div className="container mt-12 flex flex-col items-center justify-center text-center xl:max-w-5xl">
          {children}
        </div>
      </main>
    </>
  );
};
