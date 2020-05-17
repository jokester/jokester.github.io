import React from 'react';
import { Layout } from "../components/layout";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
  };
}

const IndexPage: React.FC = () => (
  <Layout>TODO</Layout>
);

export default IndexPage;
