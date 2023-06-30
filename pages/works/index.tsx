import { Layout } from '../../src/components/layout/layout';
import React from 'react';
import { MarkdownArticle } from '../../src/components/markdown/markdown-article';

const content = `
## whadido [![npm version](https://badge.fury.io/js/whadido.svg)](https://badge.fury.io/js/whadido)
 
https://github.com/jokester/whadido 

A CLI tool to find out what you did in a git repository

---

## publicaddr [![npm version](https://badge.fury.io/js/publicaddr.svg)](https://badge.fury.io/js/publicaddr)

https://github.com/jokester/publicaddr

A NPM package to enable TCP \`SO_REUSEPORT\` in node.js

---

## voxscape

A site to view and share [Magicavoxel](https://ephtracy.github.io/) voxel models

`.trim();

function WorksPage(): React.ReactElement {
  return (
    <Layout>
      <MarkdownArticle title="Personal Works" content={content}></MarkdownArticle>
    </Layout>
  );
}

export default WorksPage;
