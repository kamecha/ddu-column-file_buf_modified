import {
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.4.3/base/column.ts";
import { fn } from "https://deno.land/x/ddu_vim@v3.4.3/deps.ts";
import { BaseColumn } from "https://deno.land/x/ddu_vim@v3.4.3/types.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.3/file.ts";

export type Params = Record<never, never>;

export class Column extends BaseColumn<Params> {
  #bufinfos: fn.BufInfo[] = [];
  async getLength(args: GetLengthArguments<Params>): Promise<number> {
    this.#bufinfos = await fn.getbufinfo(args.denops, { bufmodified: true });
    return 1;
  }
  getText(args: GetTextArguments<Params>): Promise<GetTextResult> {
    const action = args.item.action as ActionData;
    const path = action.path;
    if (path === undefined) {
      return Promise.resolve({ text: " " });
    }
    if (this.isBufferRelatedFileModified(this.#bufinfos, path)) {
      return Promise.resolve({ text: "●" });
    } else {
      return Promise.resolve({ text: " " });
    }
  }
  params(): Params {
    return {};
  }
  isBufferRelatedFileModified(
    buffers: fn.BufInfo[],
    filePath: string,
  ): boolean {
    for (const buffer of buffers) {
      if (buffer.name === undefined) {
        continue;
      }
      if (buffer.name === filePath) {
        return true;
      }
    }
    return false;
  }
}
