# ddu-column-file_buf_modified

display modified buffer info column for ddu.vim

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
