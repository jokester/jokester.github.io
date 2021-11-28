import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import codeStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { MarkdownMeta } from '../../ssr/resolve-markdown-posts';
import { inServer } from '../../config/build-env';
import remarkGfm from 'remark-gfm';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const MarkdownArticle: React.FC<{ title?: string; meta?: MarkdownMeta; content: string }> = ({
  meta,
  title,
  content,
}) => {
  return (
    <div className="markdown" lang={meta?.frontMatter?.lang}>
      <h1>{title ?? meta?.frontMatter?.lang ?? ''}</h1>
      <hr />
      <ReactMarkdown className="markdown" plugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
