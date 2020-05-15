import React from 'react';
import { MDXRendererProps, MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import { GatsbyPageProps } from '../types/gatsby-page-props';
import { PostByNodeIdQuery } from '../../graphql-types';

const shortcodes = { a: Link } as any; // Provide common components here

const PageTemplate: React.FC<GatsbyPageProps<{ nodeId: string }, PostByNodeIdQuery>> = (props) => {
  const mdx = props.data.mdx!;
  return (
    <div>
      <h1>{mdx.frontmatter!.title}</h1>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PostByNodeId($nodeId: String!) {
    site {
      siteMetadata {
        title
      }
    }

    mdx(id: { eq: $nodeId }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
