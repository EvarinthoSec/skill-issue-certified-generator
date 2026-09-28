import { describe, expect, it } from "vitest";
import { MAX_CERTIFICATE_NAME_LENGTH, normalizeCertificateName } from "./certificate";

describe("normalizeCertificateName", () => {
  it("trims surrounding whitespace", () => {
    expect(normalizeCertificateName("  Ada Lovelace  ")).toBe("Ada Lovelace");
  });

  it("returns an empty string for blank input", () => {
    expect(normalizeCertificateName("   ")).toBe("");
  });

  it("preserves Thai and mixed Unicode text", () => {
    expect(normalizeCertificateName("คุณอานนท์ Anon")).toBe("คุณอานนท์ Anon");
  });

  it("limits the result to the configured number of Unicode code points", () => {
    const input = "ก".repeat(MAX_CERTIFICATE_NAME_LENGTH + 8);
    expect(Array.from(normalizeCertificateName(input))).toHaveLength(MAX_CERTIFICATE_NAME_LENGTH);
  });
});
