import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import codeStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { MarkdownMeta } from '../../ssr/resolve-markdown-posts';

const CustomRenderers = {
  code(prop: { language: string; value: string }) {
    return (
      <Prism language={prop.language} style={codeStyle}>
        {prop.value}
      </Prism>
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
