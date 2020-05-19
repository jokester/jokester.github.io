import * as React from 'react';
import { Layout } from '../src/components/layout/layout';

const UnusedWorksMd = `
## toosimple

- A simple-http-server to share 
- [npm](https://www.npmjs.com/package/toosimple) / [github](https://github.com/jokester/toosimple)

## 克苏鲁神话 中文合集

- [gitbook](https://www.gitbook.com/book/jokester/coc-zh/details) / [coc-zh.jokester.io](https://coc-zh.jokester.io/)

## 人马小姐不迷茫 中文wiki

- [centaur-worries.jokester.io](https://centaur-worries.jokester.io/)
`;

const Works: React.FC<never> = (props) => {
  return (
    <Layout>
      <h1>Works</h1>
      <hr />
      TODO
    </Layout>
  );
};

export default Works;
