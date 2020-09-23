import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Prism, PrismAsync } from 'react-syntax-highlighter';
import codeStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { MarkdownMeta } from '../../ssr/resolve-markdown-posts';
import { inServer } from '../../config/build-env';

const CustomRenderers = {
  code: function (prop: { language: string; value: string }) {
    const P = inServer ? Prism : PrismAsync;
    return (
      <P language={prop.language} style={codeStyle}>
        {prop.value}
      </P>
    );
  },
} as const;

export const MarkdownArticle: React.FC<{ title?: string; meta?: MarkdownMeta; content: string }> = ({
  meta,
  title,
  content,
}) => {
  return (
    <div className="markdown" lang={meta?.frontMatter?.lang}>
      <h1>{title ?? meta?.frontMatter?.lang ?? ''}</h1>
      <hr />
      <ReactMarkdown className="markdown" source={content} renderers={CustomRenderers} />
    </div>
  );
};
