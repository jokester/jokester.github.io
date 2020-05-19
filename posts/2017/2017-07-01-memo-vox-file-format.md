---
title: 'Memo: Inspecting vox file format'
publishAt: 2017-07-01
---

This is a memo I wrote when inspecting `.vox` file format of [MagicaVoxel](http://ephtracy.github.io/index.html?page=mv_main)

- [file-format-vox.txt](https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt)
- [More refs](http://ephtracy.github.io/index.html?page=mv_resource)

```text

0000000: 564f 5820 9600 0000 4d41 494e 0000 0000  VOX ....MAIN....
         ^VOX    ^150        ^MAIN     ^MAIN content: 0
0000010: 8800 0000 5041 434b 0400 0000 0000 0000  ....PACK........
         ^MAIN children=0x88bytes
                   ^PACK     ^PACK content: 4bytes
                                  ^PACK children: 0bytes
0000020: 0100 0000 5349 5a45 0c00 0000 0000 0000  ....SIZE........
         ^PACK content: 1model
                   ^SIZE     ^SIZE content:12bytes
                                       ^SIZE children: 0bytes
0000030: 0300 0000 0300 0000 0300 0000 5859 5a49  ............XYZI
         ^SIZE content: x/y/z          ^XYZI
0000040: 5400 0000 0000 0000 1400 0000 0202 0255  T..............U
         ^XYZI content:0x54bytes (88bytes = 4 + 4*21)
                   ^XYZI children: 0bytes
                             ^0x14 voxels
                                       ^Voxel1
0000050: 0102 0255 0002 0255 0201 0255 0000 0055  ...U...U...U...U
         ^Voxel2-5
0000060: 0001 0255 0200 0255 0100 0055 0000 0255  ...U...U...U...U
         ^Voxel6-9
0000070: 0202 0155 0200 0055 0002 0155 0001 0055  ...U...U...U...U
         ^Voxel10-13
0000080: 0201 0055 0002 0055 0200 0155 0100 0255  ...U...U...U...U
         ^Voxel14-17
0000090: 0000 0155 0202 0055 0102 0055            ...U...U...U
         ^Voxel18-20

```
