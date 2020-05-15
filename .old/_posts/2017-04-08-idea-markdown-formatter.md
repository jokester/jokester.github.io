---
title: 想要一个能重排 markdown 的东西
created_at: 2017-04-08
lang: zh
---

Features:

1. 在中英文混合时, 能自动在英文前后插入空格
    - 这个功能对日英文混合的文档也有用
2. 能配对和更新脚注数字
    - 背景: 在前后多次编辑md时, 我希望能维持数字正确且递增, 但手工改极麻烦
    - 我在 `centaur-worries-wiki` 中使用的 [代码](https://github.com/jokester/centaur-worries-wiki/blob/master/scripts/filters.ts) 只做到了 (在脚注正确时) 重新编号. 可以比这再智能点, 比如检查脚注配对情况.
    - 不妨做成交互的 (见4)
    - 可能: 脚注重构 (把脚注统一移到段末 / 章节末 / 文档末)
3. 兼容 [commonmark](http://commonmark.org/)
    - commonmark有颇完整的spec, 有多个现成的parser实现
4. 有编辑器插件
    - 比如VS Code
5. 能在md中生成toc
    - 有的md renderer能在渲染时生成toc, 但这就限制了用户的选择。我希望能在md中生成toc
6. 能重排md中的表格，成为 "在md中也不难看" 的格式

参考:

- [copywriting-correct / 中英文文案排版纠正器](https://github.com/ricoa/copywriting-correct)