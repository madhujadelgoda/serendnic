import { NICErrorCode } from "../types";

export class NICError extends Error {
  readonly code: NICErrorCode;

  constructor(code: NICErrorCode, message?: string) {
    super(message ?? code);
    this.name = "NICError";
    this.code = code;
  }
}
