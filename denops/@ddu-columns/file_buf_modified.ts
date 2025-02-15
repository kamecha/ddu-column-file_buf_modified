import {
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.4.3/base/column.ts";
import { fn } from "https://deno.land/x/ddu_vim@v3.4.3/deps.ts";
import { BaseColumn } from "https://deno.land/x/ddu_vim@v3.4.3/types.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.3/file.ts";

export type Params = {
  modifiedIcon: string;
  unmodifiedIcon: string;
};

export class Column extends BaseColumn<Params> {
  #bufinfos: fn.BufInfo[] = [];
  #textEncoder: TextEncoder = new TextEncoder();

  override async getLength(args: GetLengthArguments<Params>): Promise<number> {
    this.#bufinfos = await fn.getbufinfo(args.denops, { bufmodified: true });
    const modifiedIconLength =
      this.#textEncoder.encode(args.columnParams.modifiedIcon).length;
    const unmodifiedIconLength =
      this.#textEncoder.encode(args.columnParams.unmodifiedIcon).length;
    const length = Math.max(modifiedIconLength, unmodifiedIconLength);
    return length;
  }

  override getText(
    args: GetTextArguments<Params>,
  ): Promise<GetTextResult> {
    const action = args.item.action as ActionData;
    const path = action.path;
    const modifiedIconLength =
      this.#textEncoder.encode(args.columnParams.modifiedIcon).length;
    const unmodifiedIconLength =
      this.#textEncoder.encode(args.columnParams.unmodifiedIcon).length;
    if (path === undefined) {
      return Promise.resolve({
        text: args.columnParams.unmodifiedIcon +
          " ".repeat(args.endCol - args.startCol - modifiedIconLength),
      });
    }
    if (this.isBufferRelatedFileModified(this.#bufinfos, path)) {
      return Promise.resolve({
        text: args.columnParams.modifiedIcon +
          " ".repeat(args.endCol - args.startCol - modifiedIconLength),
      });
    } else {
      return Promise.resolve({
        text: args.columnParams.unmodifiedIcon +
          " ".repeat(args.endCol - args.startCol - unmodifiedIconLength),
      });
    }
  }

  override params(): Params {
    return {
      modifiedIcon: "●",
      unmodifiedIcon: " ",
    };
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
