# ddu-column-file_buf_modified

display modified buffer info column for ddu.vim

## Feature
display icon for file related to modified buffer

in the image bellow, the modified icon is "●".

<img width="500" alt="スクリーンショット 2024-01-27 14 04 41" src="https://github.com/kamecha/ddu-column-file_buf_modified/assets/50443168/ee09efd3-ce00-4a5d-81fe-9f8a1150c679">


## Required

### denops.vim
https://github.com/vim-denops/denops.vim

### ddu.vim
https://github.com/Shougo/ddu.vim

## Configuration
```vim
call ddu#custom#patch_global(#{
  \   columns: ['filename', 'file_buf_modified'],
  \ })
```
