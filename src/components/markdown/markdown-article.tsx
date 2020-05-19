import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Prism } from 'react-syntax-highlighter';

const CustomRenderers = {
  code(prop: { language: string; value: string }) {
    return <Prism language={prop.language}>{prop.value}</Prism>;
  },
} as const;

export const MarkdownArticle: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div className="p-2 markdown">
      <h1>{title}</h1>
      <hr />
      <ReactMarkdown className="markdown" source={content} renderers={CustomRenderers} />
    </div>
  );
};
