import { describe, it, expect } from "vitest";
import { detectNICFormat, validateNIC, parseNIC } from "../index";

describe("serendnic API surface", () => {
  it("detect format", () => {
    expect(() => detectNICFormat("199012345678")).toThrow();
  });

  it("validate NIC", () => {
    expect(() => validateNIC("199012345678")).toThrow();
  });

  it("parse NIC", () => {
    expect(() => parseNIC("199012345678")).toThrow();
  });
});
