import { describe, it, expect } from "vitest";
import {
  detectNICFormat,
  validateNIC,
  parseNIC,
  parseNICSafe
} from "../index";

describe("serendnic NIC validation", () => {
  it("detects new NIC", () => {
    expect(detectNICFormat("199012345678")).toBe("NEW");
  });

  it("detects old NIC", () => {
    expect(detectNICFormat("901234567V")).toBe("OLD");
  });

  it("trims whitespace before detecting format", () => {
    expect(detectNICFormat(" 199012345678 ")).toBe("NEW");
  });

  it("validates valid NIC", () => {
    const result = validateNIC("199012345678");
    expect(result.valid).toBe(true);
  });

  it("rejects invalid leap day", () => {
    const result = validateNIC("199036612345");
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("INVALID_LEAP_DAY");
  });

  it("rejects day 366 on non-leap year", () => {
    const result = validateNIC("199936612345");
    expect(result.valid).toBe(false);
  });

  it("rejects unknown format", () => {
    const result = validateNIC("ABC123");
    expect(result.valid).toBe(false);
  });

  it("rejects invalid suffix for old NIC", () => {
    const result = validateNIC("901234567A");
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("INVALID_SUFFIX");
  });

  it("accepts lowercase suffix in old NIC", () => {
    const result = validateNIC("901234567v");
    expect(result.valid).toBe(true);
  });

  it("parses male NIC correctly", () => {
    const info = parseNIC("199012345678");

    expect(info.birthYear).toBe(1990);
    expect(info.gender).toBe("MALE");
  });

  it("parses female NIC correctly", () => {
    const info = parseNIC("199051245678");

    expect(info.gender).toBe("FEMALE");
    expect(info.dayOfYear).toBe(12);
  });

  it("throws on invalid NIC", () => {
    expect(() => parseNIC("123")).toThrow();
  });

  it("returns safe error instead of throwing", () => {
    const result = parseNICSafe("123");

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error.code).toBeDefined();
    }
  });

  it("safe parser succeeds for valid NIC", () => {
    const result = parseNICSafe("199012345678");

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.data.birthYear).toBe(1990);
    }
  });
});
