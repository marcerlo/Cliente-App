import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/GraphqlClient";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      {router.pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ApolloProvider>
  );
}

export default MyApp;
