import {
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.4.3/base/column.ts";
import { BaseColumn } from "https://deno.land/x/ddu_vim@v3.4.3/types.ts";

export type Params = Record<never, never>;

export class Column extends BaseColumn<Params> {
  getLength({}: GetLengthArguments<Params>): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getText({}: GetTextArguments<Params>): Promise<GetTextResult> {
    throw new Error("Method not implemented.");
  }
  params(): Params {
    throw new Error("Method not implemented.");
  }
}
