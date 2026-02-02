import { describe, it, expect } from "vitest";
import { detectNICFormat, validateNIC, parseNIC } from "../index";

describe("serendnic NIC validation", () => {
  it("detects new NIC", () => {
    expect(detectNICFormat("199012345678")).toBe("NEW");
  });

  it("detects old NIC", () => {
    expect(detectNICFormat("901234567V")).toBe("OLD");
  });

  it("validates valid NIC", () => {
    const result = validateNIC("199012345678");
    expect(result.valid).toBe(true);
  });

  it("rejects invalid leap day", () => {
    const result = validateNIC("199036612345");
    expect(result.valid).toBe(false);
  });

  it("parses NIC correctly", () => {
    const info = parseNIC("199012345678");

    expect(info.birthYear).toBe(1990);
    expect(info.gender).toBe("MALE");
    expect(info.isValid).toBe(true);
  });

  it("throws on invalid NIC", () => {
    expect(() => parseNIC("123")).toThrow();
  });
});
